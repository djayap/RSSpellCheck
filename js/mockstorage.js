    // Function to fetch data from the front-end database
    function fetchData() {
        var data = localStorage.getItem('myDatabase');
        var parsedData = JSON.parse(data) || [];
        console.log('Fetched data:', parsedData);
    }

    function dataexist(word) {
           var data = localStorage.getItem('myDatabase');
                var parsedData = JSON.parse(data) || [];

                var recordIndex = parsedData.findIndex(function (item) {
                    return item.word === word;
                });
                return 0;
    }


    // Function to add a new record to the front-end database
    function addRecord(record) {
        var data = localStorage.getItem('myDatabase');
        var parsedData = JSON.parse(data) || [];
        parsedData.push(record);
        localStorage.setItem('myDatabase', JSON.stringify(parsedData));
        console.log('Record added:', record);
    }

    // Function to update a record in the front-end database
    function updateRecord(id, updatedData) {
        var data = localStorage.getItem('myDatabase');
        var parsedData = JSON.parse(data) || [];

        var recordIndex = parsedData.findIndex(function (item) {
            return item.id === id;
        });

        if (recordIndex !== -1) {
            parsedData[recordIndex] = Object.assign({}, parsedData[recordIndex], updatedData);

            localStorage.setItem('myDatabase', JSON.stringify(parsedData));
            console.log('Record updated:', parsedData[recordIndex]);
        } else {
            addRecord(id, );
            console.error('Record not found with ID:', id);
        }
    }

    // Function to delete a record from the front-end database
    function deleteRecord(id) {
        var data = localStorage.getItem('myDatabase');
        var parsedData = JSON.parse(data) || [];

        var updatedData = parsedData.filter(function (item) {
            return item.id !== id;
        });

        localStorage.setItem('myDatabase', JSON.stringify(updatedData));
        console.log('Record deleted with ID:', id);
    }
