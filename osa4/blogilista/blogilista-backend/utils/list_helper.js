const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else {
    return blogs
      .map(blog => blog.likes)
      .reduce((prev, curr) => prev + curr);
  }
};

const favoriteBlog = (blogs) => {
  if (blogs === null || blogs === undefined || blogs.length === 0) {
    return null;
  } else {
    return blogs.reduce((prev, curr) => prev.likes < curr.likes ? curr : prev);
  }
};

const mostBlogs = (blogs) => {
  if (blogs === null || blogs === undefined || blogs.length === 0) {
    return null;
  } else {
    const authors = blogs.reduce((prev, curr) => {
      prev[curr.author] ? prev[curr.author]++ : prev[curr.author] = 1;
      return prev;
    }, {});
    let most = { blogs: 0, };
    for (let author in authors) {
      if (authors[author] > most.blogs) {
        most = { author, blogs: authors[author], };
      }
    }
    return most;
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};