module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/newissue',
        destination: 'https://github.com/mocherfaoui/feedback-app/issues/new',
        permanent: true,
        basePath: false,
      },
    ];
  },
};
