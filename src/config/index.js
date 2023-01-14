class Config {
  /** App configuration
   *
   * @class Config
   */
  constructor() {
    this.PORT = process.env.PORT || 3000;
    this.DATABASE_HOST = process.env.DB_HOST;
    this.DATABASE_PORT = process.env.DB_PORT;
    this.DATABASE_SSL = process.env.DB_SSL;
    this.DATABASE_NAME = process.env.DB_NAME;
    this.DATABASE_USERNAME = process.env.DB_USER;
    this.DATABASE_PASSWORD = process.env.DB_PASS;
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.API_BASE = '/api';
    this.UPLOAD_FOLDER = 'static/uploads';
    this.MEDIA_URL = 'http://localhost:3000/media';
  }
}

module.exports = new Config();
