import React from 'react';
import { Card, Button } from 'react-bootstrap';
const News = ({ news }) => {
  return (
    <div>
      <h1 className="py-3 text-center">News</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {news
          ?.sort((a, b) => {
            return a.votes < b.votes ? 1 : a.votes > b.votes ? -1 : 0;
          })
          .map((article) => {
            return (
              <Card
                key={article.title}
                style={{ width: '18rem' }}
                className="m-1"
              >
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>{article.title}</Card.Title>
                  <div>
                    <Card.Text>
                      <div>
                        Votes: <span>{article.votes}</span>
                      </div>
                    </Card.Text>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={article.link}
                      variant="primary"
                      className="btn btn-sm btn-primary w-25"
                    >
                      Go
                    </a>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default News;
