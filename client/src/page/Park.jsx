import React from 'react';
const divStyle = {
  width: '70vw',
  margin: '0 auto',
};

function Park(props) {
  return (
    <div style={divStyle}>
      <img
        src='https://helios-i.mashable.com/imagery/articles/07CIEf4aHNEhXeK7MSpNYt5/hero-image.fill.size_1248x702.v1648747007.jpg'
        alt='강아지가 산책하고 있는 공원'
      />
      <p>행복한 산책 되세요~</p>
    </div>
  );
}

export default Park;
