

const AppConfig = {
  env: "dev",
  backend: {
    mock: {
      host: "localhost",
      port: "3000",
      prefix: "/static/mock",
    },
    dev: {
      host: "localhost",
      port: "8764",
      prefix: "/api/v1",
    },
    prod: {
      host: "localhost",
      port: "8764",
      prefix: "/api/v1",
    },
    test: {
      host: "localhost",
      port: "8764",
      prefix: "/api/v1",
    }
  }

}

export default AppConfig;
