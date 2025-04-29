const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const term = event.pathParameters?.term;
    const params = {
        TableName: 'CloudTerms',
        Key: { term }
    };

    try {
        const data = await dynamoDB.get(params).promise();
        if (!data.Item) {
            return {
                statusCode: 404,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Term not found' })
            };
        }
        return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(data.Item)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Could not retrieve term' })
        };
    }
};