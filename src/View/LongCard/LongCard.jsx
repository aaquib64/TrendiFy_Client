import React from "react";
import "./Longcard.css";
import { Link } from "react-router-dom";

const LongCard = () => {
  return (
    <div className="container-fluid py-4 px-3">
      <h2 className="text-center text-danger mt-3 mb-3">
        MEDAL WORTHY BRANDS TO BAG
      </h2>

      <div className="row g-4">
        {/* ADIDAS */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
          <div className="card h-100 shadow-sm">
            <Link to="/shop/Men/Activewear">
              <img
                src="https://adrenaline.pl/data/include/cms/bidzikowski/Blog/Adidas-Originals-o-co-musisz-wiedziec-/foto_originals.jpg"
                className="card-img-top brand-img"
                alt="Adidas"
              />
            </Link>
            <div className="card-body text-center">
              <h5 className="card-title">ADIDAS</h5>
              <p className="card-text mb-2">UNSTOPPABLE COMFORT</p>
              <h6 className="fw-bold text-danger">MIN 40-60% OFF</h6>
            </div>
          </div>
        </div>

        {/* PUMA */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
          <div className="card h-100 shadow-sm">
            <Link to="/shop/Men/Activewear">
              <img
                src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/625835/11/mod01/fnd/SEA/fmt/png/PUMA-CNY-T7-Track-Pants"
                className="card-img-top brand-img"
                alt="Puma"
              />
            </Link>
            <div className="card-body text-center">
              <h5 className="card-title">PUMA</h5>
              <p className="card-text mb-2">BUILT FOR THE ACTIVE YOU</p>
              <h6 className="fw-bold text-danger">FLAT 70% OFF</h6>
            </div>
          </div>
        </div>

        {/* NIKE */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
          <div className="card h-100 shadow-sm">
            <Link to="/shop/Men/T-shirt">
              <img
                src="https://static.nike.com/a/images/t_default/ef8bade3-2a04-453c-b737-f88d5d01cc6c/sportswear-t-shirt-Kqb0mV.png"
                className="card-img-top brand-img"
                alt="Nike"
              />
            </Link>
            <div className="card-body text-center">
              <h5 className="card-title">NIKE</h5>
              <p className="card-text mb-2">DESIGNED FOR CHAMPIONS</p>
              <h6 className="fw-bold text-danger">MIN 30-60% OFF</h6>
            </div>
          </div>
        </div>

        {/* RED TAPE */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
          <div className="card h-100 shadow-sm">
            <Link to="/shop/Men/Footwear">
              <img
                src="http://redtape.com/cdn/shop/files/RSO3742_8_jpg_f99142a9-d9a1-438f-89b3-91f32a83c1fa.jpg?v=1711701210"
                className="card-img-top brand-img"
                alt="Red Tape"
              />
            </Link>
            <div className="card-body text-center">
              <h5 className="card-title">RED TAPE</h5>
              <p className="card-text mb-2">TRENDING FOOTWEAR</p>
              <h6 className="fw-bold text-danger">FLAT 85% OFF</h6>
            </div>
          </div>
        </div>

        {/* US POLO */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
          <div className="card h-100 shadow-sm">
            <Link to="/shop/Men/T-shirt">
              <img
                src="https://assets.laboutiqueofficielle.com/w_450,q_auto,f_auto/media/products/2018/03/02/us-polo-assn_135095_19745175-50313-155_20180903T142157_03.jpg"
                className="card-img-top brand-img"
                alt="US Polo"
              />
            </Link>
            <div className="card-body text-center">
              <h5 className="card-title">US POLO ASSN</h5>
              <p className="card-text mb-2">EVERYDAY GO-TO-FIND</p>
              <h6 className="fw-bold text-danger">MIN 50-70% OFF</h6>
            </div>
          </div>
        </div>

        {/* CALVIN KLEIN */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
          <div className="card h-100 shadow-sm">
            <Link to="/shop/Women/Beauty">
              <img
                src="https://images-prod.dazeddigital.com/1080/azure/dazed-prod/1350/2/1352493.jpg"
                className="card-img-top brand-img"
                alt="Calvin Klein"
              />
            </Link>
            <div className="card-body text-center">
              <h5 className="card-title">CALVIN KLEIN</h5>
              <p className="card-text mb-2">BEST FOR PARTY</p>
              <h6 className="fw-bold text-danger">MIN 30-60% OFF</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // (
  //  <div>
  //    <h2 className="mt-4 ms-3 mb-4 text-center text-danger" >MEDAL WORTHY BRANDS TO BAG</h2>
  //   <div className="card-group ">

  //     <div className="card">
  //       <Link to="/shop/Men/Activewear">
  //         <img src="https://t-static.dafiti.com.br/d7qomA3AQBSh0V9ivyXycl6Hj4I=/fit-in/430x623/static.dafiti.com.br/p/adidas-adidas-agasalho-canelado-adidas-sportwear-1912-7740219-5-zoom.jpg" className="card-img-top" alt="..." />
  //       </Link>
  //       <div className="card-body text-center">
  //         <h5 className="card-title">ADIDAS</h5>
  //         <div className="card-text">
  //         UNSTOPPABLE COMFORT
  //         <h5 className="card-title fs-6 fw-bold text-danger">MIN 40-60% OFF</h5>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="card">
  //     <Link to="/shop/Men/Activewear">
  //       <img src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/625835/11/mod01/fnd/SEA/fmt/png/PUMA-CNY-T7-Track-Pants" className="card-img-top" alt="..." />
  //       </Link>
  //       <div className="card-body text-center">
  //         <h5 className="card-title">PUMA</h5>
  //         <div className="card-text">
  //         BUILT FOR THE ACTIVE YOU
  //         <h5 className="card-title fs-6 fw-bold text-danger">FLAT 70% OFF</h5>
  //         </div>

  //       </div>
  //     </div>
  //     <div className="card">
  //     <Link to="/shop/Men/T-shirt">
  //       <img src="https://static.nike.com/a/images/t_default/ef8bade3-2a04-453c-b737-f88d5d01cc6c/sportswear-t-shirt-Kqb0mV.png" className="card-img-top" alt="..." />
  //       </Link>
  //       <div className="card-body text-center">
  //         <h5 className="card-title">NIKE</h5>
  //         <div className="card-text">
  //         DESIGNED FOR CHAMPIONS
  //         <h5 className="card-title fs-6 fw-bold text-danger">MIN 30-60% OFF</h5>
  //         </div>

  //       </div>

  //     </div>

  //     <div className="card">
  //     <Link to="/shop/Men/Footwear">
  //       <img src="http://redtape.com/cdn/shop/files/RSO3742_8_jpg_f99142a9-d9a1-438f-89b3-91f32a83c1fa.jpg?v=1711701210" className="card-img-top" alt="..." />
  //       </Link>
  //       <div className="card-body text-center">
  //         <h5 className="card-title">RED TAPE</h5>
  //         <div className="card-text">
  //          TRENDING FOOTWEAR
  //         <h5 className="card-title fs-6 fw-bold text-danger">FLAT 85% OFF</h5>
  //         </div>

  //       </div>

  //     </div>
  //     <div className="card">
  //     <Link to="/shop/Men/T-shirt">
  //       <img src="https://assets.laboutiqueofficielle.com/w_450,q_auto,f_auto/media/products/2018/03/02/us-polo-assn_135095_19745175-50313-155_20180903T142157_03.jpg" className="card-img-top" alt="..." />
  //       </Link>
  //       <div className="card-body text-center">
  //         <h5 className="card-title">US POLO ASSN</h5>
  //         <div className="card-text">
  //         EVERYDAY GO-TO-FIND
  //         <h5 className="card-title fs-6 fw-bold text-danger">MIN 50-70% OFF</h5>
  //         </div>

  //       </div>

  //     </div>

  //     <div className="card">
  //     <Link to="/shop/Women/Beauty">
  //       <img src="http://www.durandeals.com.br/wp-content/uploads/2016/11/perfume-ck-be-1-1.jpg" className="card-img-top" alt="..." />
  //       </Link>
  //       <div className="card-body text-center">
  //         <h5 className="card-title">CALVIN KLEIN</h5>
  //         <div className="card-text">
  //         BEST FOR PARTY
  //         <h5 className="card-title fs-6 fw-bold text-danger">MIN 30-60% OFF</h5>
  //         </div>

  //       </div>

  //     </div>
  //   </div>
  //  </div>
  // );
};
export default LongCard;
