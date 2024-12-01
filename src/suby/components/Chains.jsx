import React from 'react'
import { API_URL } from '../api'
import{useState, useEffect} from 'react'
import { FaRegArrowAltCircleRight,FaRegArrowAltCircleLeft } from "react-icons/fa";
import { MagnifyingGlass } from 'react-loader-spinner';

const Chains = () => {
    const [vendorData, setVendorData] = useState([])
    const [scrollPositiom, setScrollPosition] = useState(0)
    const [loading, setLoading] = useState(true)
    const vendorFirmHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/vendor/all-vendors`)
            const NewData = await response.json();
            setVendorData(NewData);
            console.log("This is API data:",NewData);
            setLoading(false)
        } catch (error) {
            alert("Failed to fetch data from API")
            console.error("Failed to fetch data from API", error)
            setLoading(true)
        }
    }
    useEffect(()=>{
        vendorFirmHandler()
    },[]);
    const handleScroll = (direction) => {
        const gallery = document.getElementById("chainGallery");
        const scrollAmount = 500;
        if(direction === "left"){
            gallery.scrollTo({
                left: gallery.scrollLeft - scrollAmount,
                behavior: "smooth"
            })
        }else if(direction === "right"){
            gallery.scrollTo({
                left: gallery.scrollLeft + scrollAmount,
                behavior: "smooth"
            })
        }
    }   
    return (        
        <div className='mediaChainSection'>
           <div className='loaderSection'>
                {loading && <>
                        <div className='loader'>
                            Your 🥣 is loading.......
                        </div>
                        <MagnifyingGlass
                            visible={true}
                            color="#e15b64"
                            height="80"
                            width="80"
                            ariaLabel='magnifying-glass-loading'
                            wrapperStyle={{}}
                            wrapperClass='magnifying-glass-wrapper'
                            glassColor='#c0efff'
                            />
                    </>}
            </div>             
            <div className='btnSection'>
                <button onClick={()=>{handleScroll("left")}} aria-label='click here to move previous'><FaRegArrowAltCircleLeft className='btnIcons'/></button>
                <button onClick={()=>{handleScroll("right")}} aria-label='click here to move next'><FaRegArrowAltCircleRight className='btnIcons'/></button>
            </div>
            <h3>Top restaurant chains in Hyderabad</h3>
            <section className="chainSection" id="chainGallery" onScroll={(e)=>setScrollPosition(e.target.scrollLeft)}>
                {vendorData.vendors && vendorData.vendors.map((vendor)=>{
                return(
                    <>
                        <div className="vendorBox">
                            {vendor.firm.map((item)=>{
                            return(
                                    <>
                                        <div>{item.firmName}</div>
                                        <div>
                                            <img src={`${API_URL}/uploads/${item.image}`}/>
                                        </div>
                                    </>

                            )
                            
                            })}
                        </div> 
                    </>
                )
                })}
            </section>
        </div>
  )
}

export default Chains