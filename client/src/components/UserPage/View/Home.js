import React from 'react'
import { Link } from "react-router-dom";
import bg from '../../../assets/img/Background.jpeg'
import ReactPlayer from 'react-player/youtube'

// components

import Navbar from "components/Navbars/AuthNavbar.js";


function Home() {


    return (
        <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                `url('${bg}')`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Your story starts with us.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    This is a simple website about movies. with many new newsletter elements and reviews of current movies
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
                {/*  */}
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <i class="far fa-newspaper"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Movie News</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    Update the latest news on google cinema news
                    </p>
                  </div>
                </div>
              </div>
                {/*  */}
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                    <i class="fas fa-photo-video"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Trailer Movie</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    Video trailers and videos related to movies that interest you
                    </p>
                  </div>
                </div>
              </div>
  {/*  */}
              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                    <i class="fas fa-comments"></i> 
                    </div>
                    <h6 className="text-xl font-semibold">Review Movie</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    Review of newly released movies received a lot of attention from everyone
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i class="fas fa-newspaper"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    Movie news updates
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  
                    Update exact news. from different pages and continuously so that you have as much information as possible
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  The kit comes with three pre-built pages to help you get
                  started faster. You can change the text and images and you're
                  good to go. Just make sure you enable them first via
                  JavaScript.
                </p>
                <Link to="/news" className="font-bold text-blueGray-700 mt-8">
                  View More!
                </Link>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src= {require("assets/img/Newsbanner.jpg").default}
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote  className="relative p-8 mb-4 bg-lightBlue-500">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                    Avengers: Endgame
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                    Avengers: Endgame is a 2019 American superhero film based on the Marvel Comics superhero team the Avengers. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is the direct sequel to Avengers: Infinity War (2018) and the 22nd film in the Marvel Cinematic Universe (MCU). Directed by Anthony and Joe Russo and written by Christopher Markus and Stephen McFeely, the film features an ensemble cast including Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner, Don Cheadle, Paul Rudd, Brie Larson, Karen Gillan, Danai Gurira, Benedict Wong, Jon Favreau, Bradley Cooper, Gwyneth Paltrow, and Josh Brolin. In the film, the surviving members of the Avengers and their allies attempt to reverse the damage caused by Thanos in Infinity War.
                    </p>
                  </blockquote>
                </div>
              </div>
              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src= {require("assets/img/kieu.jpg").default}
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote  className="relative p-8 mb-4 bg-lightBlue-500">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                    ???Ki???u???: D??? ??n Phim ??i???n ???nh Truy???n Ki???u Ch??nh Th???c Kh???i ?????ng

                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                    ?????u l??ng hai ??? t??? nga, Th??y Ki???u l?? ch??? em l?? Th??y V??n ?????o???n Tr?????ng T??n Thanh??? hay c??n g???i l?? ???Truy???n Ki???u??? ???????c xem l?? m???t trong nh???ng t??c ph???m xu???t ch??ng c???a v??n h???c Vi???t Nam, t???ng ???????c d???ch ra h??n 20 th??? ti???ng kh??c nhau tr??n th??? gi???i nh?? Anh, Nga, Ph??p, Nh???t??? v???i tr??n 35 b???n d???ch. Nh??n d???p k??? ni???m 200 ng??y m???t c???a ?????i thi h??o Nguy???n Du, nh?? s???n xu???t Mai Thu Huy???n thu???c c??ng ty TNHH Tincom Media quy???t ?????nh th???c hi???n d??? ??n ??i???n ???nh Ki???u v?? d??? ki???n ra m???t t???i r???p chi???u phim v??o th??ng 11 n??m 2020........
                    </p>
                  </blockquote>
                </div>
              </div>
              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src= {require("assets/img/tinphim.png").default}
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote  className="relative p-8 mb-4 bg-lightBlue-500">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                        Danh s??ch phim hay 2020 v?? bom t???n 2021 ????ng mong ch??? nh???t
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                    Birds of Prey - 
                    The New Mutants - 
                    Wonder Woman 1984 - 
                    Mulan - 
                    Pee Nak 2 - 
                    Tenet - 
                    Bloodshot - 
                    Monster Hunter - 
                    Ti???c tr??ng m??u - 
                    Underwater
                    </p>
                  </blockquote>
                </div>
              </div>
              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src= {require("assets/img/tinphim.jpg").default}
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote  className="relative p-8 mb-4 bg-lightBlue-500">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                    L???t M???t: Nh?? C?? Kh??ch
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                    L???t M???t: Nh?? C?? Kh??ch xoay quanh chuy???n tr??? v??? nh?? ng??? t?????ng r???t vui v??? ?????m ???m c???a Vy c??ng b???n b??. Th??? nh??ng, m???t chu???i nh???ng tai n???n v?? s??? vi???c b???t th?????ng di???n ra ???? ?????y t??nh th??? c???a t???t c??? m???i ng?????i, ?????c bi???t l?? Vy v??o t??nh th??? nguy hi???m. L??m sao ????? c?? th??? c???u Vy v?? ng??n nh???ng m???i nguy hi???m ti???p theo x???y ra?...
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img style={{transform: 'rotate(-10deg) translate(0px,-100px)',height:'400px'}}
                  alt="..."
                  className="absolute max-w-full rounded-lg shadow-lg"
                  src={require("assets/img/Bloodsh.jpg").default}
                />
                <img style={{transform: 'rotate(20deg) translate(80px,-100px)',height:'400px'}}
                  alt="..."
                  className=" absolute rounded-lg shadow-lg"
                  src={require("assets/img/Venom.jpg").default}
                />
                <img style={{transform: 'rotate(-20deg) translate(-230px,-100px)',height:'400px'}}
                  alt="..."
                  className=" absolute max-w-full rounded-lg shadow-lg"
                  src={require("assets/img/BoGia.jpg").default}
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                  <i class="fas fa-photo-video"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">Movie and information</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  Update the latest movie theaters with information in advance of the audience's expectations.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <i class="fas fa-calendar-alt"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                          Release date
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <i class="fas fa-users"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            casts
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <i class="fab fa-youtube"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Video trailer
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                  <hr/>
                <h2 className="text-4xl font-semibold">Reveal attractive video trailers</h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                 
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  
                <ReactPlayer
                    controls
                    muted={true}
                    playing={true}
                    className='react-player'
                    url='https://www.youtube.com/watch?v=TY3IAqm-gpE&t=54s'
                    width='100%'
                    height='100%'
                    />
                  <div className="pt-6 text-center">
                  <h2>Jupiter???s Legacy | Official Trailer | Netflix</h2>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  
                <ReactPlayer
                    controls
                    muted={true}
                    playing={true}
                    className='react-player'
                    url='https://www.youtube.com/watch?v=nW948Va-l10'
                    width='100%'
                    height='100%'
                    />
                  <div className="pt-6 text-center">
                  <h2>Marvel Studios' Loki | Official Trailer | Disney+</h2>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  
                <ReactPlayer
                    controls
                    muted={true}
                    playing={true}
                    className='react-player'
                    url='https://www.youtube.com/watch?v=odM92ap8_c0'
                    width='100%'
                    height='100%'
                    />
                  <div className="pt-6 text-center">
                  <h2>Godzilla vs. Kong ??? Official Trailer</h2>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  
                <ReactPlayer
                    controls
                    muted={true}
                    playing={true}
                    className='react-player'
                    url='https://www.youtube.com/watch?v=JuDLepNa7hw'
                    width='100%'
                    height='100%'
                    />
                  <div className="pt-6 text-center">
                  <h2>THE SUICIDE SQUAD Trailer (2021) Suicide Squad 2 Movie</h2>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-blueGray-800">
          

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
             
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Excelent Services
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Grow your market
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Launch time
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Want to contact with us?
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      Complete this form and we will get back to you in 24
                      hours.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
    )
}

export default Home
