

const AppConfig = {
  env: "prod",
  backend: {
    mock: {
      host: "localhost",
      port: "3000",
      prefix: "/static/mock",
    },
    dev: {
      host: "localhost",
      port: "8000",
      prefix: "/api/v1",
    },
    prod: {
      host: "47.112.252.228",
      port: "8000",
      prefix: "/api/v1",
    },
    test: {
      host: "localhost",
      port: "8000",
      prefix: "/api/v1",
    }
  }

}

export default AppConfig;
