module.exports = {
    'development': {
        'storage': 'feedback.sqlite',
        'dialect': 'sqlite'
    },
    'production': {
        'host': process.env.DB_HOST,
        'database': process.env.DB_NAME,
        'username': process.env.DB_USERNAME,
        'password': process.env.DB_PASSWORD,
        'dialect': 'postgres',
        'dialectOptions': {
            'ssl': {
                'require': true,
                'rejectUnauthorized': false
            }
        }
    }
}