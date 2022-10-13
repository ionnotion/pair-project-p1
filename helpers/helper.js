class Helper {
    static toCurrencyRupiah(number) {
        return `Rp.` + Intl.NumberFormat('en-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number).slice(4)
    }

    static timeSince(date) {

      let seconds = Math.floor((new Date() - date) / 1000);
    
      let interval = seconds / 31536000;
    
      if (interval > 1) {
        return Math.floor(interval) + " year(s) ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " month(s) ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " day(s) ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hour(s) ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minute(s) ago";
      }
      return Math.floor(seconds) + " second(s) ago";
    }

    static profit(now,previous,lot) {
      return (now-previous)*lot
  }

}

module.exports = Helper