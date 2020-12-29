module.exports = {
  ci: {
    collect: {
      startServerCommand: "yarn run start",
      url: ["http://localhost:8080/"],
      startServerReadyPattern: "Server is running on PORT 8080",
      startServerReadyTimeout: 20000,
      numberOfRuns: 5,
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        /* doesnt build if the tests results do not match certain criteria */
        //   'categories:performance': ['error', { minScore: 0.9 }],
        "categories:accessibility": ["warn", { minScore: 0.9 }],
      },
    },
  },
};
