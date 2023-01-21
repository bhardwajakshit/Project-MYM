import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/user.context';
import "../App.css"

// Interface for PhotoData Props along with their types.
interface PhotoData {
    media_type: JSX.Element;
    url: string,
    title: string,
    date: string,
    explanation: string
}

// Using env to access Nasa API 
const apiKey = process.env.REACT_APP_NASA_API;

const Home: React.FC = () => {

 const { logOutUser } = useContext(UserContext);
 
 // Logout Function
 const logOut = async () => {
   try {
     // Calling the logOutUser function from the user context
     const userloggedOut = await logOutUser();
     // Refreshing the page after user is logged out which will redirect the user to login page. 
     if (userloggedOut) {
       window.location.reload();
      }
    } catch (error) {
        alert(error)
    }
  }
 
 const [photoData, setPhotoData] = useState<PhotoData | null>(null);

    // Fetching Picture from NASA API and updating the PhotoData.
    useEffect(() => {       
        fetchPhoto();
        async function fetchPhoto(){
            const res =  await fetch (
                'https://api.nasa.gov/planetary/apod?api_key='+apiKey
            );
            const data = await res.json();
            setPhotoData(data);
            console.log(data);
        }
    }, []);

    if(!photoData) return <div />


 return (
  <div className="enableBlur">
    <h1 className='home_h1'> Project (MYM) </h1>
      <div className="nasa-photo">
          {photoData.media_type = "image" ? (
            <img src ={photoData.url} alt ={photoData.title}/>
            ) : (
                <iframe className="video">
                title = {photoData.title}
                src = {photoData.url}
                frameBorder = "0"
                gesture = "media"
                allow = "encrypted-media"
                allowFullScreen
                className = "photo"        
                </iframe>
                )
          }   
            <div>
              <h1>{photoData.title}</h1>
              <p>{photoData.date}</p>
              <p>{photoData.explanation}</p>
            </div>
        </div>
     <div className="button_flex">
     <button className="home_button" onClick={logOut}> Logout </button>
     </div>
    </div>
 )};

 export default Home