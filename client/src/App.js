import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout';
import { Home } from './components/features/Posts/PostsContainer';
import PostsPage from './components/pages/Posts/PostsPage';
import Contact from './components/pages/Contact/ContactPage';
import NotFound from './components/pages/NotFound/NotFoundPage';
// import RandomPost from './components/pages/RandomPost/RandomPostContainer';
import AddPost from './components/features/AddPost/AddPost';
import SinglePost from './components/features/SinglePost/SinglePostContainer';
import EditPost from './components/features/EditPost/EditPostContainer';

class App extends React.Component {

  render() {
    return (
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/posts" exact component={PostsPage} />
          <Route path="/contact" exact component={Contact} />
          {/* <Route path="/random" exact component={RandomPost} /> */}
          <Route path="/posts/new" exact component={AddPost} />
          <Route path="/posts/:id" exact component={SinglePost} />
          <Route path="/posts/edit/:id" exact component={EditPost} />
          <Route component={NotFound} />
        </Switch>
      </MainLayout>
    );
  }

};

export default App;
