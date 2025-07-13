 const calendar = document.getElementById('calendar');
 const eventInfo = document.getElementById('event-info');
 
 const events = {
   '2024-09-09': 'TCS Aptitude Test',
   '2024-09-20': 'TCS Interview'
 };

 document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev', 
      center: 'title',  
      right: 'next'  
    },
    footerToolbar: {
      left: 'today', 
      center: '', 
      right: ''  
    },
    events: [
      {
        title: 'Mini Project Submission',
        start: '2024-10-24',
        description: 'Explain the Project and Show the Final Product.',
        backgroundColor: '#FF5733',
        borderColor: '#FF5733'
      },
      {
        title: 'Placement Drive',
        start: '2024-11-10',
        description: 'Placement drive for final-year students.',
        backgroundColor: '#33FF57',
        borderColor: '#33FF57'
      },
      {
        title: 'Java Seminar',
        start: '2024-10-27',
        description: 'Seminar on Java programming best practices.',
        backgroundColor: '#5733FF',
        borderColor: '#5733FF'
      },
      {
        title: 'Test',
        start: '2024-10-29',
        description: 'Seminar on Java programming best practices.',
        backgroundColor: '#5733FF',
        borderColor: '#5733FF'
      }
    ],
    eventClick: function(info) {
      var eventInfo = document.getElementById('event-info');
      eventInfo.textContent = info.event.title + ": " + info.event.extendedProps.description;
    },
    dayMaxEvents: true
  });

  calendar.render();
});

 function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('open');
}

window.onload = function() {
  loadProfileImage();
  loadResume();
  loadProjects();
};

function displayProfileImage(event) {
  const image = document.getElementById('profileImage');
  const uploadButton = document.getElementById('uploadPhotoBtn');
  const editPhotoBtn = document.getElementById('editPhotoBtn');
  
  const reader = new FileReader();
  
  reader.onload = function() {
    const imageData = reader.result;
    localStorage.setItem('profileImage', imageData);
    image.src = imageData;
    image.style.display = 'block';
    uploadButton.style.display = 'none';
    editPhotoBtn.style.display = 'inline';
  };
  
  reader.readAsDataURL(event.target.files[0]);
}

function loadProfileImage() {
  const storedImage = localStorage.getItem('profileImage');
  if (storedImage) {
    document.getElementById('profileImage').src = storedImage;
    document.getElementById('profileImage').style.display = 'block';
    document.getElementById('uploadPhotoBtn').style.display = 'none';
    document.getElementById('editPhotoBtn').style.display = 'inline';
  }
}

function handleResumeUpload(event) {
  const resumeFile = event.target.files[0];
  if (resumeFile) {
    const reader = new FileReader();
    
    reader.onload = function() {
      const resumeData = reader.result;
      localStorage.setItem('resumeFile', resumeData);
      localStorage.setItem('resumeFileName', resumeFile.name);
      document.getElementById('resumeFileName').innerHTML = `<a href="${resumeData}" download="${resumeFile.name}">Download/View Resume</a>`;
      document.getElementById('resumeFileName').style.display = 'block';
    };
    
    reader.readAsDataURL(resumeFile);
  }
}

function loadResume() {
  const resumeFileName = localStorage.getItem('resumeFileName');
  const resumeFile = localStorage.getItem('resumeFile');
  if (resumeFileName && resumeFile) {
    document.getElementById('resumeFileName').innerHTML = `<a href="${resumeFile}" download="${resumeFileName}">Download/View Resume</a>`;
    document.getElementById('resumeFileName').style.display = 'block';
  }
}

function openModal() {
  document.getElementById('projectModal').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function closeModal() {
  document.getElementById('projectModal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

function saveProject() {
  const projectName = document.getElementById('projectName').value;
  const githubLink = document.getElementById('githubLink').value;
  const description = document.getElementById('description').value;

  if (projectName && githubLink && description) {
    const project = { projectName, githubLink, description };
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
    
    closeModal();
    displayProjects();
  }
}

function loadProjects() {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  displayProjects(projects);
}

function displayProjects() {
  const projectList = document.getElementById('projectsList');
  projectList.innerHTML = ''; 

  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.forEach((project, index) => {
    const projectItem = document.createElement('li');
    projectItem.innerHTML = `<a href="${project.githubLink}" target="_blank">${project.projectName}</a> - ${project.description} <button onclick="deleteProject(${index})">Delete</button>`;
    projectList.appendChild(projectItem);
  });
}

function deleteProject(index) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.splice(index, 1);
  localStorage.setItem('projects', JSON.stringify(projects));
  displayProjects();
}

document.addEventListener("DOMContentLoaded", function() {
  const newsContainer = document.querySelector(".news-section");
  const apiKey = "1e4062cd2a554e75a2d7da307ad397dc";

  function fetchTechNews() {
    const url = `https://newsapi.org/v2/everything?q=coding OR engineering OR technology&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayNews(data.articles);
      })
      .catch(error => {
        console.error("Error fetching news:", error);
      });
  }

  function displayNews(articles) {
    const newsHTML = articles
      .map(article => {
        return `
          <div class="news-item">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available"}</p>
            <div class="react">
              <a href="${article.url}" target="_blank">
                <button>Know More</button>
              </a>
            </div>
          </div>
        `;
      })
      .join("");

    newsContainer.innerHTML += newsHTML;
  }

  fetchTechNews();
});