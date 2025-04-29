const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const query = event.queryStringParameters?.query || '';
    const params = {
        TableName: 'CloudTerms',
        FilterExpression: 'contains(#term, :query) OR contains(#definition, :query)',
        ExpressionAttributeNames: {
            '#term': 'term',
            '#definition': 'definition'
        },
        ExpressionAttributeValues: {
            ':query': query.toLowerCase()
        }
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(data.Items)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Could not retrieve terms' })
        };
    }
};const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const query = event.queryStringParameters?.query || '';
    const params = {
        TableName: 'CloudTerms',
        FilterExpression: 'contains(#term, :query) OR contains(#definition, :query)',
        ExpressionAttributeNames: {
            '#term': 'term',
            '#definition': 'definition'
        },
        ExpressionAttributeValues: {
            ':query': query.toLowerCase()
        }
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(data.Items)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Could not retrieve terms' })
        };
    }
};