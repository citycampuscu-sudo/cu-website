const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function updateSchedule() {
  console.log('\n=== Weekly Activities Updater ===\n');
  
  const activity = {};
  
  rl.question('Day: ', (day) => {
    activity.day = day;
    
    rl.question('Title: ', (title) => {
      activity.title = title;
      
      rl.question('Time: ', (time) => {
        activity.time = time;
        
        rl.question('Location: ', (location) => {
          activity.location = location;
          
          rl.question('Description: ', (description) => {
            activity.description = description;
            
            // Read existing data
            const data = JSON.parse(fs.readFileSync('./src/data/activities.json', 'utf8'));
            
            // Add new activity
            data.activities.push(activity);
            
            // Write back to file
            fs.writeFileSync('./src/data/activities.json', JSON.stringify(data, null, 2));
            
            console.log('\n✅ Activity added successfully!');
            console.log('Restart your website to see changes.');
            
            rl.close();
          });
        });
      });
    });
  });
}

updateSchedule();