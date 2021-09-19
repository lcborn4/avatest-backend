module.exports = () => {
    return {
        randId
    }

    //helper function
    function randId() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    }
}