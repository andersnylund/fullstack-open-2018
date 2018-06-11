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
  if (blogs === null || blogs === undefined) {
    return null;
  } else if (blogs.length === 0) {
    return null;
  } else {
    return blogs.reduce((prev, curr) => prev.likes < curr.likes ? curr : prev);
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};