/**
 * @type {import('semantic-release').GlobalConfig}
 */
const config = {
  repositoryUrl: "https://github.com/Yuri-Machado-Luz/yurim-web-core",
  tagFormat: "v${version}",
  branches: [
    "main",
    {
      name: "development",
      prerelease: "alpha",
    },
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};

export default config;
