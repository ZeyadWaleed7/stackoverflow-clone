import React from "react";
import { Link } from "react-router-dom";
import styles from "./ExploreHead.module.css";

const SearchBar = () => {
  return (
    <div className={styles["search-bar"]}>
      <form action="#" aria-label="Search" role="search">
        <div className={styles["search-input-container"]}>
          <div className={styles["search-icon"]}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            aria-label="Search query"
            role="combobox"
            autoCapitalize="sentences"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            enterKeyHint="search"
          />
        </div>
      </form>
    </div>
  );
};

const NavigationTabs = () => {
  const tabs = [
    { label: "For You", href: "/explore/tabs/for_you", selected: true },
    { label: "Trending", href: "/explore/tabs/trending", selected: false },
    { label: "News", href: "/explore/tabs/news", selected: false },
    { label: "Sports", href: "/explore/tabs/sports", selected: false },
    { label: "Entertainment", href: "/explore/tabs/entertainment", selected: false },
  ];

  return (
    <nav aria-live="polite" role="navigation">
      <div className={styles["navigation-tabs"]}>
        <div className={styles["tab-list"]}>
          {tabs.map((tab, index) => (
            <Link
              key={index}
              to={tab.href}
              role="tab"
              aria-selected={tab.selected}
              className={tab.selected ? styles["selected"] : ""}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

const ExploreHead = () => {
  return (
    <div className={styles["main-container"]}>
      <SearchBar />
      <NavigationTabs />
    </div>
  );
};

export default ExploreHead;
