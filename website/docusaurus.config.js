/*! Copyright (c) 2022, XAPPmedia */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "📣 Stentor",
  tagline: "Conversational AI Platform - Developer Documentation",
  url: "https://stentorium.github.io",
  baseUrl: "/stentor/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.svg",
  organizationName: "stentorium", // Usually your GitHub org/user name.
  projectName: "stentor", // Usually your repo name.

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "api",
        path: "../api/docs",
        routeBasePath: "api",
        sidebarPath: false,  // Auto-generate sidebar
        editUrl: "https://github.com/stentorium/stentor/tree/master/",
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          path: "../docs",
          // Please change this to your repo.
          editUrl:
            "https://github.com/stentorium/stentor/tree/master/docs/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "📣stentor",
        items: [
          {
            type: "doc",
            docId: "getting-started",
            position: "left",
            label: "Guides",
          },
          {
            to: "/api",
            label: "API Reference",
            position: "left",
          },
          {
            href: "https://github.com/stentorium/stentor",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting Started",
                to: "/docs/getting-started",
              },
              {
                label: "API Reference",
                to: "/api",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/stentorium/stentor",
              },
              {
                label: "npm",
                href: "https://www.npmjs.com/package/stentor",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} XAPP AI. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
