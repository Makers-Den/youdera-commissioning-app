import axios from 'axios';
before(() => {
  axios.create({
    url: 'https://dev.youdera.com/api/cypress',
    data: { k: 'ImcRh1pav5ckyQC4137weR5btQs1y3l' },
  });
});
