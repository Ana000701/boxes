import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, } from "react-leaflet";
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapNavbar from "../components/MapNavbar";

const UserLocation = () => {
    const map = useMap();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    map.setView([latitude, longitude], 15); // 設定地圖中心到用戶位置
                },
                (error) => {
                    console.error("無法獲取位置：", error);
                }
            );
        } else {
            console.error("瀏覽器不支援地理位置功能！");
        }
    }, [map]);

    return null; // 不需要渲染任何元素
};

function Map({logo}) {

    const [stations, setStations] = useState([
        {
            "id": 1,
            "memberId": 1,
            "stationName": "味佳奇早餐店",
            "address": "臺北市士林區延平北路5段90號",
            "phone": "+886-2-28113898#",
            "imgUrl": "https://fakeimg.pl/400x300/",
            "latitude": 25.0810879,
            "longitude": 121.5107373,
            "pendingBoxesXL": 36,
            "pendingBoxesL": 29,
            "pendingBoxesM": 39,
            "pendingBoxesS": 3,
            "recyclableBoxes": {
                "XL": 42,
                "L": 39,
                "M": 27,
                "S": 4
            },
            "createdAt": "2024-01-28T05:50:03.268Z",
            "updatedAt": "2024-02-09T05:16:35.634Z"
        },
        {
            "id": 2,
            "memberId": 2,
            "stationName": "哪次不吃早午餐店",
            "address": "新北市三重區大同南路152號1樓",
            "phone": "+886-2-29750970#",
            "imgUrl": "https://fakeimg.pl/400x300/",
            "latitude": 25.0578043,
            "longitude": 121.4966324,
            "pendingBoxesXL": 26,
            "pendingBoxesL": 50,
            "pendingBoxesM": 25,
            "pendingBoxesS": 28,
            "recyclableBoxes": {
                "XL": 44,
                "L": 11,
                "M": 8,
                "S": 42
            },
            "createdAt": "2024-03-11T08:21:26.181Z",
            "updatedAt": "2024-02-27T21:40:55.573Z"
        }
    ]);
    const [availableTags, setAvailableTags] = useState([]);
    const [activeStation, setActiveStation] = useState(null);
    const [StationsDailyHours, setStationsDailyHours] = useState(null);
    //環保餐廳環境即時通地圖資料 
    // https://data.gov.tw/dataset/145036
    const api = 'https://raw.githubusercontent.com/itsdaiyy/Hex-React-project-data/refs/heads/main';

    const getStations = async () => {
        try {
            const response = await axios.get(`${api}/stations.json`);
            setStations(response.data.stations);
            console.log('站點資料載入成功')

            getStationsDailyHours();
        }
        catch (error) {
            console.log(error);
            console.log('站點資料載入失敗')
        }
        finally {
            console.log('站點資料載入結束')
        }
    }

    useEffect(() => {
        getStations();
    }, []);

    const MapClickHandler = ({ onMapClick }) => {
        useMapEvent("click", () => {
            onMapClick(); // 地圖被點擊時執行
        });
        return null;
    };

    const customIcon = new L.Icon({
        iconUrl: "https://as1.ftcdn.net/jpg/05/23/83/42/480_F_523834217_W7Tz83KoT9yoa4HH9AdqNtYAYrE0qMEy.png?token=1737953942_Xo2cx3OUeyt1ehBh_2i36tB_3VqF2qIRLzkH6QzvRAU",
        iconSize: [50, 50],
    });

    const countRecyclableBoxes = (item) => {
        return item.recyclableBoxes.XL + item.recyclableBoxes.L + item.recyclableBoxes.M + item.recyclableBoxes.S
    }

    const countPendingBoxes = (item) => {
        return item.pendingBoxesXL + item.pendingBoxesL + item.pendingBoxesM + item.pendingBoxesS
    }

    const getStationsDailyHours = async () => {
        try {
            const response = await axios.get(`${api}/stationDailyHours.json`);
            setStationsDailyHours(response.data.stationDailyHours);
            console.log('營業時間載入成功')
        }
        catch (error) {
            console.log(error);
            console.log('營業時間載入失敗')
        }
        finally {
            console.log('營業時間載入結束')
        }
    }

    const getStationDailyHours = (station) => {
        console.log(station.id);
        let openTime = '尚未填寫';
        StationsDailyHours.forEach(item => {
            if (item.id === station.id) {
                openTime = `${item.openingTime}-${item.closingTime}`
            }
        })

        return openTime;
    }

    const getAvailableTags = (stations) => {
        let stationsName = stations.map(item => item.stationName); // 取得所有站點名稱
        let stationsAddress = stations.map(item => item.address); // 取得所有站點地址
        let tags = [...stationsName,...stationsAddress];//合併陣列
        setAvailableTags(tags); // 更新狀態
        console.log(tags); // 確認是否成功取得標籤
    };
    
    // 確保在站點資料載入後執行
    useEffect(() => {
        if (stations.length > 0) {
            getAvailableTags(stations);
        }
    }, [stations]);

    return (
        <>
            <MapNavbar logo={logo} availableTags={availableTags}></MapNavbar>
            <div className="py-5 px-5 xl:container mx-auto flex flex-col md:flex-row justify-between">
                {activeStation ? (
                    <div className="w-5/12 px-5 flex-shrink-0 flex-grow-0">
                        <h5 className="text-xl font-bold mb-3">{activeStation.stationName}</h5>
                        <div className="flex gap-3 mb-5">
                            <div className="w-4/12">
                                <img src='https://fakeimg.pl/300/' className="rounded-lg object-contain" alt={activeStation.stationName} />
                            </div>
                            <div className="w-8/12">
                                <div>
                                    <h5 className="text-base flex gap-2 mb-1">
                                        {countRecyclableBoxes(activeStation) ? <span className="rounded-lg bg-blue-600 text-white p-2 text-sm">可認領</span> : <></>}
                                        {countPendingBoxes(activeStation) ? <span className="rounded-lg bg-green-600 text-white p-2 text-sm">可認領</span> : <></>}
                                    </h5>
                                    <p className="text-base">地址：{activeStation.address}<br />電話：{activeStation.phone ? activeStation.phone : '尚未填寫'}
                                        <br />營業時間：{getStationDailyHours(activeStation)}</p>
                                </div>
                            </div>
                        </div>
                        <h6 className='rounded-lg bg-gray-600 text-white p-2 text-sm text-center mb-3'>回收認領資訊</h6>
                        <div className="rounded-lg border-gray-950 border-solid border p-3 flex gap-2 justify-center mb-5 gap-6">
                            <div className='w-6/12'>
                                <h6 className='text-center'>可回收紙箱</h6>
                                <div className="flex gap-2 justify-center">
                                    <div className="w-3/12 border border-gray-950 rounded-lg border-solid p-2 text-center">
                                        <h6>S</h6>
                                        <p>{activeStation.recyclableBoxes.S}</p>
                                    </div>
                                    <div className="w-3/12 border border-gray-950 rounded-lg border-solid p-2 text-center">
                                        <h6>M</h6>
                                        <p>{activeStation.recyclableBoxes.M}</p>
                                    </div>
                                    <div className="w-3/12 border border-gray-950 rounded-lg border-solid p-2 text-center">
                                        <h6>L</h6>
                                        <p>{activeStation.recyclableBoxes.L}</p>
                                    </div>
                                    <div className="w-3/12 border border-gray-950 rounded-lg border-solid p-2 text-center">
                                        <h6>XL</h6>
                                        <p>{activeStation.recyclableBoxes.XL}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-6/12'>
                                <h6 className='text-center'>可認領紙箱</h6>
                                <div className="flex gap-2 justify-center ">
                                    <div className="w-3/12 border border-gray-950 rounded-lg border-solid p-2 text-center">
                                        <h6>S</h6>
                                        <p>{activeStation.pendingBoxesS}</p>
                                    </div>
                                    <div className="w-3/12 border border-gray-950 rounded-lg border-solid p-2 text-center">
                                        <h6>M</h6>
                                        <p>{activeStation.pendingBoxesM}</p>
                                    </div>
                                    <div className="w-3/12 border border-gray-950 rounded-lg border-solid p-2 text-center">
                                        <h6>L</h6>
                                        <p>{activeStation.pendingBoxesL}</p>
                                    </div>
                                    <div className="w-3/12 border border-gray-950 rounded-lg border-solid p-2 text-center">
                                        <h6>XL</h6>
                                        <p>{activeStation.pendingBoxesXL}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-12/12 flex justify-center">
                            <Link to='/' className="rounded-lg bg-yellow-600 text-white p-2 text-sm">查看紙箱列表</Link>
                        </div>
                    </div>) : <></>
                }

                <MapContainer
                    center={[stations[0].latitude, stations[0].longitude]} // 預設第一個站點
                    zoom={15}
                    style={{ height: '500px', width: "100%" }}
                >
                    {/* 地圖圖層 */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* 關閉側邊欄 */}
                    <MapClickHandler onMapClick={() => setActiveStation(null)} />

                    {/* 地圖上的標記 */}
                    {
                        stations.map(item => (
                            <Marker position={[item.latitude, item.longitude]} key={item.id} eventHandlers={{
                                click: () => {
                                    setActiveStation(item); // 設定選中的站點
                                },
                            }} icon={customIcon}>
                                <Popup>
                                    <h5 className='font-bold text-xl text-center mb-3'>{item.stationName}</h5>
                                    <div className='flex gap-2 justify-center'>
                                        <button type='button' className='rounded-lg bg-blue-600 text-white py-2 px-3'>可回收 {countRecyclableBoxes(item)} 個</button>
                                        <button type='button' className='rounded-lg bg-green-600 text-white py-2 px-3'>可認領 {countPendingBoxes(item)} 個</button>
                                    </div>
                                    <p className='text-center'>{item.address}</p>
                                    <div className='flex justify-center'>
                                        <button type="button" className="rounded-lg bg-gray-600 text-white py-2 px-3">查看紙箱列表</button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))
                    }

                    <UserLocation />
                </MapContainer>
            </div >
        </>
    )
}

export default Map