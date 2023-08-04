import React, { useState } from 'react';

const Cthree = () => {
  const initialAuctions = [
    {
      id: 1,
      title: '(팔아요)지호네 텃밭 작물',
      currentBid: 100,
      bidAmount: 0,
    },
    {
      id: 2,
      title: '(팔아요)지혜네 텃밭 작물',
      currentBid: 150,
      bidAmount: 0,
    },
    {
      id: 3,
      title: '(팔아요)민아네 텃밭 작물',
      currentBid: 200,
      bidAmount: 0,
    },
    {
      id: 4,
      title: '(팔아요)건식네 텃밭 작물',
      currentBid: 180,
      bidAmount: 0,
    },
    {
      id: 5,
      title: '(팔아요)춘모네 텃밭 작물',
      currentBid: 120,
      bidAmount: 0,
    },
  ];

  const [auctions, setAuctions] = useState(initialAuctions);

  const handleBidChange = (e, index) => {
    const newAuctions = [...auctions];
    newAuctions[index].bidAmount = Number(e.target.value);
    setAuctions(newAuctions);
  };

  const handleBid = (index) => {
    const newAuctions = [...auctions];
    const bidAmount = newAuctions[index].bidAmount;
    if (bidAmount > newAuctions[index].currentBid) {
      newAuctions[index].currentBid = bidAmount;
      newAuctions[index].bidAmount = 0;
      setAuctions(newAuctions);
      alert(`입찰이 성공적으로 이루어졌습니다. 현재 입찰가는 ${bidAmount}원 입니다.`);
    } else {
      alert('현재 입찰가보다 높은 금액으로 입찰해주세요.');
    }
  };

  const renderAuctionsInRows = () => {
    const rows = [];
    let currentRow = [];
    auctions.forEach((item, index) => {
      currentRow.push(
        <div className='money' key={item.id} style={{ margin: '10px', width: '300px', textAlign: 'center' }}>
          <h2>{item.title}</h2>
          <img src={`/img/auction_${item.id}.jpg`} alt={item.title} style={{ width: '200px', height: '200px' }} />
          <p>현재 입찰가: {item.currentBid}원</p>
          <input type="number" value={item.bidAmount} onChange={(e) => handleBidChange(e, index)} />
          <button onClick={() => handleBid(index)}>입찰하기</button>
        </div>
      );

      if ((index + 1) % 3 === 0 || index === auctions.length - 1) {
        rows.push(
          <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            {currentRow}
          </div>
        );
        currentRow = [];
      }
    });
    return rows;
  };

  return (
    <div>
      <h1 className='cthreetitle'>팜팜 장터</h1>
      {renderAuctionsInRows()}
    </div>
  );
};

export default Cthree;