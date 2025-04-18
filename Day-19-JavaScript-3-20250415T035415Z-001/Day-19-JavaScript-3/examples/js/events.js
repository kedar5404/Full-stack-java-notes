// Fetch the event data from the JSON file
fetch('http://localhost:3000/events')
    .then(response => response.json())
    .then(events => {
        // Generate the data for the charts
        const eventTypeData = {};
        const locationData = {};

        events.forEach(event => {
            // Count event types
            eventTypeData[event.EventType] = (eventTypeData[event.EventType] || 0) + 1;
            // Count locations
            locationData[event.Location] = (locationData[event.Location] || 0) + 1;
        });

        // Generate random colors for the bars
        const generateRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        // Prepare data for the bar chart
        const barChartLabels = Object.keys(eventTypeData);
        const barChartData = Object.values(eventTypeData);
        const barChartColors = barChartLabels.map(generateRandomColor);

        // Prepare data for the pie chart
        const pieChartLabels = Object.keys(locationData);
        const pieChartData = Object.values(locationData);

        // Create the bar chart
        const barCtx = document.getElementById('barChart').getContext('2d');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: barChartLabels,
                datasets: [{
                    label: 'Event Type Count',
                    data: barChartData,
                    backgroundColor: barChartColors,
                    borderColor: barChartColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Create the pie chart
        const pieCtx = document.getElementById('pieChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: pieChartLabels,
                datasets: [{
                    label: 'Event Location Count',
                    data: pieChartData,
                    backgroundColor: pieChartLabels.map(generateRandomColor)
                }]
            },
            options: {
                responsive: true
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
