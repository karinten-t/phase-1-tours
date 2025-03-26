Here's a README.md file for Namelok Tours and Travel project.
Namelok Tours and Travel - Single Page Website

[Namelok Tours Logo](images/logo2.avif)

A responsive single-page website for Namelok Tours and Travel company featuring tour listings, guide profile, and contact form.
 Features:

- Single Page Application**: No page reloads/redirects
- Dynamic Content**: Loads tours from JSON server
- Interactive Elements:
  - Navigation between sections
  - Tour filtering functionality
  - Contact form submission
  - Image hover effects
- Responsive Design: Works on mobile, tablet, and desktop
- Tour Guide Profile: With skills, goals, and vision
 Technologies Used:

- HTML
- CSS
- JavaScript
- JSON Server 

Project Structure


namelok-tours/
index.html           
 style.css           
 script.js           
 db.json             
 README.md           
 images

The project uses these endpoints from json-server:

- `GET /tours` - Retrieves all available tours
- Sample tour object:
  json
  {
    "id": 1,
    "name": "Maasai Mara Safari",
    "description": "3-day wildlife safari...",
    "price": 850,
    "duration": "3 days",
    "image": "images/mara.avif"
  }
  

Event Listeners Implemented

1. Navigation Click Events**:
   - Switches between sections without page reload
   - Updates active navigation link

2. Form Submit Event**:
   - Handles contact form submission
   - Prevents default form behavior
   - Logs form data to console (simulates server submission)

3. Image Hover Events**:
   - Adds scale effect on guide image hover
   - Removes effect when mouse leaves

4. Filter Button Click Events**:
   - Filters tours by price range
   - Resets to show all tours

 Array Methods Used

- `filter()`: For filtering affordable tours (< $1000)
- `map()`: For transforming tour data into HTML elements
- `forEach()`: For displaying guide's skills and setting up event listeners

 How to Customize

1. Change Tours Data:
   - Edit the `db.json` file to update tour information
   - Add/remove tour objects as needed

2. Update Guide Information**:
   - Modify the `guideData` object in `script.js`
   - Replace `images/guide.jpg` with your guide's photo

3. Change Styling:
   - Edit colors in the `:root` variables in `style.css`
   - Adjust layout in the respective CSS sections

Future Enhancements

- Add user authentication
- Implement booking system
- Include customer reviews section
- Add photo gallery with lightbox
- Implement search functionality for tours

 Contact

For questions or support, please contact:

Namelok Tours and Travel  
Email: info@nameloktours.com  
Phone: +254 790060685  
Address: 123 Safari Lane, Nairobi, Kenya




