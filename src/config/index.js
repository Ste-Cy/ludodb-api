class Config {
  /** App configuration
   *
   * @class Config
   */
  constructor() {
    // CONFIG SERVER
    this.HOST = process.env.HOST;
    this.PORT = process.env.PORT;
    // CONFIG DB
    this.DB_HOST = process.env.DB_HOST;
    this.DB_PORT = process.env.DB_PORT;
    this.DB_SSL = process.env.DB_SSL;
    this.DB_NAME = process.env.DB_NAME;
    this.DB_USER = process.env.DB_USER;
    this.DB_PASS = process.env.DB_PASS;
    // CONFIG PATH
    this.API_BASE = '/api';
    this.MEDIA_BASE = '/media';
    this.MEDIA_URL = this.HOST + this.MEDIA_BASE;
    this.UPLOAD_FOLDER = 'static/uploads';
    // CONFIG SECRET
    this.JWT_SECRET = process.env.JWT_SECRET;
  }
}

module.exports = new Config();
