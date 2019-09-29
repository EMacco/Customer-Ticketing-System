import React from 'react';
import Loader from "react-loader-spinner/src";

const PreLoader = () => {
    return (
        <div>
            <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
              <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 top50p">
                  <Loader
                      type="Puff"
                      color="#d87523"
                      height={100}
                      width={100}
                      timeout={3000}
                  />
              </span>
            </div>
        </div>
    )
};

export default PreLoader;
