const client = require('../config/elasticsearch');
const { fetchQuestions } = require('../services/questionservice');
const validator = require('validator');

// Sanitize and validate search parameters to prevent XSS attacks
const sanitizeSearchParams = (query, tags) => {
  const sanitizedQuery = query ? validator.escape(query.trim()) : '';
  const sanitizedTags = tags ? tags.split(',').map(tag => validator.escape(tag.trim())).filter(Boolean) : [];

  return {
    query: sanitizedQuery,
    tags: sanitizedTags
  };
};

exports.indexQuestions = async (req, res) => {
  try {
    // Fetch questions from Q/A service
    const questions = await fetchQuestions();

    // Index each question into Elasticsearch
    const body = questions.flatMap(question => [
      { index: { _index: 'questions', _id: question._id } },
      {
        title: question.title,
        description: question.description,
        tags: question.tags,
        answers: question.answers.map(answer => answer.content),
        comments: question.comments.map(comment => comment.content),
        createdAt: question.createdAt,
      },
    ]);

    const bulkResponse = await client.bulk({ body });

    if (bulkResponse.errors) {
      console.error('Error indexing questions:', bulkResponse.errors);
      return res.status(500).json({ error: 'Failed to index questions' });
    }

    res.status(200).json({ message: 'Questions indexed successfully' });
  } catch (error) {
    console.error('Error in indexQuestions:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.searchQuestions = async (req, res) => {
  try {
    const { query, tags } = req.query;

    // Sanitize and validate input
    const { query: sanitizedQuery, tags: sanitizedTags } = sanitizeSearchParams(query, tags);

    // Build the Elasticsearch query
    const searchQuery = {
      index: 'questions',
      body: {
        query: {
          bool: {
            must: sanitizedQuery ? {
              multi_match: {
                query: sanitizedQuery,
                fields: ['title^2', 'description', 'answers', 'comments'],
                fuzziness: 'AUTO',
              },
            } : undefined,
            filter: sanitizedTags.length > 0 ? {
              terms: { tags: sanitizedTags }
            } : undefined,
          },
        },
      },
    };

    const result = await client.search(searchQuery);

    const hits = result.hits.hits.map(hit => ({
      id: hit._id,
      score: hit._score,
      ...hit._source,
    }));

    res.status(200).json(hits);
  } catch (error) {
    console.error('Error in searchQuestions:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.handleQuestionEvent = async (eventType, data) => {
  try {
    if (eventType === 'QUESTION_CREATED' || eventType === 'QUESTION_UPDATED') {
      // Index or update the question in Elasticsearch
      await client.index({
        index: 'questions',
        id: data._id,
        body: {
          title: data.title,
          description: data.description,
          tags: data.tags,
          answers: data.answers.map(answer => answer.content),
          comments: data.comments.map(comment => comment.content),
          createdAt: data.createdAt,
        },
      });
      console.log(`Indexed/Updated question ${data._id} in Elasticsearch`);
    } else if (eventType === 'QUESTION_DELETED') {
      // Delete the question from Elasticsearch
      await client.delete({
        index: 'questions',
        id: data._id,
      });
      console.log(`Deleted question ${data._id} from Elasticsearch`);
    }
  } catch (error) {
    console.error(`Error handling event ${eventType}:`, error.message);
  }
};