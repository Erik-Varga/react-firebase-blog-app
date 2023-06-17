import React from 'react'
import Articles from './Articles';
import AddArticle from './AddArticle';

export default function Home() {
  return (
    <section className='container home mb-3'>
        <div className='row'>
          <div className='col-md-4'>
            <AddArticle />
          </div>
          <div className='col-md-8'>
            <Articles />
          </div>
        </div>
      </section>
  );
}
