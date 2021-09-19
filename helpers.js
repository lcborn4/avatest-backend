module.exports = () => {
    return {
        revisedRandId
    }

    //helper function
    function revisedRandId() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    }
}