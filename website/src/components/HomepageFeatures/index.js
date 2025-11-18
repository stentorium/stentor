import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Multi-Platform',
    emoji: '🌍',
    description: (
      <>
        Build once, deploy everywhere. Stentor supports Alexa, Google Assistant,
        and custom chat platforms from a single codebase.
      </>
    ),
  },
  {
    title: 'TypeScript First',
    emoji: '⚡',
    description: (
      <>
        Fully typed interfaces and models provide excellent IDE support and
        catch errors at compile time, not runtime.
      </>
    ),
  },
  {
    title: 'Handler-Based Architecture',
    emoji: '🔧',
    description: (
      <>
        Organize conversation logic into modular handlers that process intents,
        manage state, and control conversation flow.
      </>
    ),
  },
];

function Feature({emoji, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <span style={{fontSize: '4rem'}} role="img" aria-label={title}>
          {emoji}
        </span>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
