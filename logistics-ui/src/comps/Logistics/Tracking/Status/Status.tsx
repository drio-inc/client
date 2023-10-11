/* eslint-disable react/no-unescaped-entities */

const Status = () => {
  return (
    <div className="p-10 bg-blue-50 rounded-tl-2xl rounded-tr-md rounded-bl-2xl rounded-br-md flex-col justify-center items-center gap-12 inline-flex">
      <div className="flex-col justify-start items-center gap-9 flex">
        <div className="flex-col justify-start items-start gap-10 flex">
          <div className="flex-col justify-start items-start gap-0.5 flex">
            <div className="text-neutral-900 text-xl font-bold font-['Inter'] leading-relaxed">
              Delivery Status
            </div>
            <div>
              <span className="text-slate-600 text-sm font-medium font-['Inter'] leading-tight">
                Order No:{" "}
              </span>
              <span className="text-slate-600 text-sm font-bold font-['Inter'] leading-tight">
                #12737689
              </span>
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-2 flex">
            <div className="w-96 h-3 relative">
              <div className="w-96 h-1 left-0 top-[4.63px] absolute bg-gradient-to-r from-red-800 via-red-500 to-red-800 rounded-xl" />
              <div className="w-96 h-3 left-[0.24px] top-0 absolute justify-between items-center inline-flex">
                <div className="w-3 h-3 bg-rose-300 rounded-full" />
                <div className="w-3 h-3 bg-rose-400 rounded-full" />
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-red-700 rounded-full" />
                <div className="w-3 h-3 bg-red-800 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-center gap-4 flex">
          <div className="w-96 h-6 justify-between items-start inline-flex">
            <div className="flex-col justify-start items-start inline-flex">
              <div className="text-gray-500 text-xs font-semibold font-['Inter'] leading-relaxed">
                23 April, 2023
              </div>
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="text-gray-500 text-xs font-semibold font-['Inter'] leading-relaxed">
                30 April, 2023
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start flex">
            <div className="w-64 text-center text-red-800 text-xl font-semibold font-['Inter'] leading-7">
              Delivered
            </div>
            <div className="w-64 text-center text-gray-700 text-sm font-medium font-['Inter'] leading-7">
              to Minneapolis, Minnesota
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-6 flex">
        <div className="justify-start items-start gap-6 inline-flex">
          <div className="w-60 h-16 p-3 rounded-md shadow border border-gray-400 justify-start items-center gap-3 flex">
            <div className="w-9 h-9 p-2 bg-sky-100 rounded justify-center items-center gap-2 flex">
              <div className="w-6 h-6 justify-center items-center flex">
                <div className="w-6 h-6 relative"></div>
              </div>
            </div>
            <div className="w-32 flex-col justify-start items-start inline-flex">
              <div className="w-32 text-neutral-900 text-sm font-semibold font-['Inter'] leading-tight">
                Current Location
              </div>
              <div className="text-slate-600 text-xs font-semibold font-['Inter'] leading-tight">
                Los Angeles, USA{" "}
              </div>
            </div>
          </div>
          <div className="w-60 h-16 p-3 rounded-md shadow border border-gray-400 justify-start items-center gap-3 flex">
            <div className="w-9 h-9 p-2 bg-sky-100 rounded justify-center items-center gap-2 flex">
              <div className="w-6 h-6 justify-center items-center flex">
                <div className="w-6 h-6 relative"></div>
              </div>
            </div>
            <div className="w-32 flex-col justify-start items-start inline-flex">
              <div className="text-neutral-900 text-sm font-semibold font-['Inter'] leading-tight">
                Destination Location
              </div>
              <div className="text-slate-600 text-xs font-semibold font-['Inter'] leading-tight">
                Minneapolis, Minnesota
              </div>
            </div>
          </div>
        </div>
        <div className="justify-start items-start gap-6 inline-flex">
          <div className="w-60 h-16 p-3 rounded-md shadow border border-gray-400 justify-start items-center gap-3 flex">
            <div className="w-9 h-9 p-2 bg-sky-100 rounded justify-center items-center gap-2 flex">
              <div className="w-6 h-6 justify-center items-center flex">
                <div className="w-6 h-6 relative"></div>
              </div>
            </div>
            <div className="w-32 flex-col justify-start items-start inline-flex">
              <div className="w-32 text-neutral-900 text-sm font-semibold font-['Inter'] leading-tight">
                Distance in KM
              </div>
              <div className="text-slate-600 text-xs font-semibold font-['Inter'] leading-tight">
                65 km
              </div>
            </div>
          </div>
          <div className="w-60 h-16 p-3 rounded-md shadow border border-gray-400 justify-start items-center gap-3 flex">
            <div className="w-9 h-9 p-2 bg-sky-100 rounded justify-center items-center gap-2 flex">
              <div className="w-6 h-6 justify-center items-center flex">
                <div className="w-6 h-6 relative"></div>
              </div>
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="justify-start items-start inline-flex">
                <div className="w-24 text-neutral-900 text-sm font-semibold font-['Inter'] leading-tight">
                  Origin Lat long
                </div>
                <div className="w-5 h-5 justify-center items-center gap-2 flex">
                  <div className="w-3 h-3 origin-top-left rotate-180 justify-center items-center flex">
                    <div className="w-3 h-3 relative"></div>
                  </div>
                </div>
              </div>
              <div className="text-slate-600 text-xs font-semibold font-['Inter'] leading-tight">
                N 50° 6' 52.776", W 94° 31' 21.5148"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
