import React,{useState,useEffect} from 'react';     //파이어 베이스 이용
import main from '../assets/main.png';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import data from '../data.json';
import Card from '../components/Card';
import Loading from '../components/Loading';
import { StatusBar } from 'expo-status-bar';
import * as Location from "expo-location";
import axios from "axios"
import {firebase_db} from "../firebaseConfig"

export default function MainPage({navigation,route}) {
  console.disableYellowBox = true;
  //return 구문 밖에서는 슬래시 두개 방식으로 주석

  //기존 꿀팁을 저장하고 있을 상태
  const [state,setState] = useState([])
  //카테고리에 따라 다른 꿀팁을 그때그때 저장관리할 상태
  const [cateState,setCateState] = useState([])

  //날씨 데이터 상태관리 상태 생성!
  const [weather, setWeather] = useState({
    temp : 0,
    condition : ''
  })

  //컴포넌트에 상태를 여러개 만들어도 됨
  //관리할 상태이름과 함수는 자유자재로 정의할 수 있음
  //초기 상태값으로 리스트, 참거짓형, 딕셔너리, 숫자, 문자 등등 다양하게 들어갈 수 있음.
  const [ready,setReady] = useState(true)

  useEffect(()=>{
	   
    //뒤의 1000 숫자는 1초를 뜻함
    //1초 뒤에 실행되는 코드들이 담겨 있는 함수
    setTimeout(()=>{
        //헤더의 타이틀 변경
        navigation.setOptions({
            title:'나만의 꿀팁'
        })
        firebase_db.ref('/tip').once('value').then((snapshot) => {
          console.log("파이어베이스에서 데이터 가져왔습니다!!")
          let tip = snapshot.val();
          setState(tip)
          setCateState(tip)
          getLocation()
          setReady(false)
        });
        // setTimeout(()=>{
        //     let tip = data.tip;
        //     setState(tip)
        //     setCateState(tip)
        //     getLocation()
        //     setReady(false)
        // },500)
    },1000)

    
  },[])

  const getLocation = async () => {
    //수많은 로직중에 에러가 발생하면
    //해당 에러를 포착하여 로직을 멈추고,에러를 해결하기 위한 catch 영역 로직이 실행
    try {
      //자바스크립트 함수의 실행순서를 고정하기 위해 쓰는 async,await
      await Location.requestPermissionsAsync();
      const locationData= await Location.getCurrentPositionAsync();
      const latitude = locationData['coords']['latitude']
      const longitude = locationData['coords']['longitude']
      const API_KEY = "cfc258c75e1da2149c33daffd07a911d";
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const temp = result.data.main.temp; 
      const condition = result.data.weather[0].main
      
      console.log(temp)
      console.log(condition)

      //오랜만에 복습해보는 객체 리터럴 방식으로 딕셔너리 구성하기!!
      //잘 기억이 안난다면 1주차 강의 6-5를 다시 복습해보세요!
      setWeather({
        temp,condition
      })


    } catch (error) {
      //혹시나 위치를 못가져올 경우를 대비해서, 안내를 준비합니다
      Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껏다 켜볼까요?");
    }
  }

    const category = (cate) => {
        if(cate == "전체보기"){
            //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
            setCateState(state)
        }else{
            setCateState(state.filter((d)=>{
                return d.category == cate
            }))
        }
    }


  //실제 데이터를 넣을 예정이므로 주석!
	// let todayWeather = 10 + 17;
  // let todayCondition = "흐림"

	//처음 ready 상태값은 true 이므로 ? 물음표 바로 뒤에 값이 반환(그려짐)됨
  //useEffect로 인해 데이터가 준비되고, ready 값이 변경되면 : 콜론 뒤의 값이 반환(그려짐)
  return ready ? <Loading/> :  (
    /*
      return 구문 안에서는 {슬래시 + * 방식으로 주석
    */
    <ScrollView style={styles.container}>
        <StatusBar style="black" />
        {/* <Text style={styles.title}>나만의 꿀팁</Text> */}
        <Text style={styles.weather}>오늘의 날씨: {weather.temp + '°C   ' + weather.condition} </Text>
        <TouchableOpacity style={styles.aboutButton} onPress={()=>{navigation.navigate('AboutPage')}}>
          <Text style={styles.aboutButtonText}>소개 페이지</Text>
        </TouchableOpacity>
        <Image style={styles.mainImage} source={main}/>
        <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
            <TouchableOpacity style={styles.middleButtonAll} onPress={()=>{category('전체보기')}}><Text style={styles.middleButtonTextAll}>전체보기</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('생활')}}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton02} onPress={()=>{category('재테크')}}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton03} onPress={()=>{category('반려견')}}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton04} onPress={()=>{navigation.navigate('LikePage')}}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
        </ScrollView>
        <View style={styles.cardContainer}>
            {/* 하나의 카드 영역을 나타내는 View */}
            {
            cateState.map((content,i)=>{
                return (<Card content={content} key={i} navigation={navigation}/>)
            })
            }
            
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: '#fff',
  },
  title: {
    //폰트 사이즈
    fontSize: 20,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:50,
    //왼쪽 공간으로 부터 이격
    marginLeft:20
  },
weather:{
    alignSelf:"flex-end",
    paddingRight:20
  },
  mainImage: {
    //컨텐츠의 넓이 값
    width:'90%',
    //컨텐츠의 높이 값
    height:200,
    //컨텐츠의 모서리 구부리기
    borderRadius:10,
    marginTop:20,
    //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
    //각 속성의 값들은 공식문서에 고대로~ 나와 있음
    alignSelf:"center"
  },
  middleContainer:{
    marginTop:20,
    marginLeft:10,
    height:60
  },
  middleButtonAll: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#20b2aa",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButton01: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#fdc453",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButton02: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#fe8d6f",
    borderRadius:15,
    margin:7
  },
  middleButton03: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#9adbc5",
    borderRadius:15,
    margin:7
  },
  middleButton04: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#f886a8",
    borderRadius:15,
    margin:7
  },
  middleButtonText: {
    color:"#fff",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center"
  },
  middleButtonTextAll: {
    color:"#fff",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center"
  },
  cardContainer: {
    marginTop:10,
    marginLeft:10
  },
  aboutButton: {
    backgroundColor:"pink",
    width:100,
    height:40,
    borderRadius:10,
    alignSelf:"flex-end",
    marginRight:20,
    marginTop:10
  },
  aboutButtonText: {
    color:"#fff",
    textAlign:"center",
    marginTop:10
  }


});








// import React,{useState,useEffect} from 'react';     //서버에서 날씨 데이터 들고와서 적용
// import main from '../assets/main.png';
// import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
// import data from '../data.json';
// import Card from '../components/Card';
// import Loading from '../components/Loading';
// import { StatusBar } from 'expo-status-bar';
// import * as Location from "expo-location";
// import axios from "axios"

// export default function MainPage({navigation,route}) {
//   console.disableYellowBox = true;
//   //return 구문 밖에서는 슬래시 두개 방식으로 주석

//   //기존 꿀팁을 저장하고 있을 상태
//   const [state,setState] = useState([])
//   //카테고리에 따라 다른 꿀팁을 그때그때 저장관리할 상태
//   const [cateState,setCateState] = useState([])

//   //날씨 데이터 상태관리 상태 생성!
//   const [weather, setWeather] = useState({
//     temp : 0,
//     condition : ''
//   })

//   //컴포넌트에 상태를 여러개 만들어도 됨
//   //관리할 상태이름과 함수는 자유자재로 정의할 수 있음
//   //초기 상태값으로 리스트, 참거짓형, 딕셔너리, 숫자, 문자 등등 다양하게 들어갈 수 있음.
//   const [ready,setReady] = useState(true)

//   useEffect(()=>{
	   
//     //뒤의 1000 숫자는 1초를 뜻함
//     //1초 뒤에 실행되는 코드들이 담겨 있는 함수
//     setTimeout(()=>{
//         //헤더의 타이틀 변경
//         navigation.setOptions({
//             title:'나만의 꿀팁'
//         })
//         //꿀팁 데이터로 모두 초기화 준비
//         let tip = data.tip;
//         setState(tip)
//         setCateState(tip)
//         getLocation()
//         setReady(false)
//     },1000)

    
//   },[])

//   const getLocation = async () => {
//     //수많은 로직중에 에러가 발생하면
//     //해당 에러를 포착하여 로직을 멈추고,에러를 해결하기 위한 catch 영역 로직이 실행
//     try {
//       //자바스크립트 함수의 실행순서를 고정하기 위해 쓰는 async,await
//       await Location.requestPermissionsAsync();
//       const locationData= await Location.getCurrentPositionAsync();
//       const latitude = locationData['coords']['latitude']
//       const longitude = locationData['coords']['longitude']
//       const API_KEY = "cfc258c75e1da2149c33daffd07a911d";
//       const result = await axios.get(
//         `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
//       );

//       const temp = result.data.main.temp; 
//       const condition = result.data.weather[0].main
      
//       console.log(temp)
//       console.log(condition)

//       //오랜만에 복습해보는 객체 리터럴 방식으로 딕셔너리 구성하기!!
//       //잘 기억이 안난다면 1주차 강의 6-5를 다시 복습해보세요!
//       setWeather({
//         temp,
//         condition
//       })


//     } catch (error) {
//       //혹시나 위치를 못가져올 경우를 대비해서, 안내를 준비합니다
//       Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껏다 켜볼까요?");
//     }
//   }

//     const category = (cate) => {
//         if(cate == "전체보기"){
//             //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
//             setCateState(state)
//         }else{
//             setCateState(state.filter((d)=>{
//                 return d.category == cate
//             }))
//         }
//     }


//   //실제 데이터를 넣을 예정이므로 주석!
// 	// let todayWeather = 10 + 17;
//   // let todayCondition = "흐림"

// 	//처음 ready 상태값은 true 이므로 ? 물음표 바로 뒤에 값이 반환(그려짐)됨
//   //useEffect로 인해 데이터가 준비되고, ready 값이 변경되면 : 콜론 뒤의 값이 반환(그려짐)
//   return ready ? <Loading/> :  (
//     /*
//       return 구문 안에서는 {슬래시 + * 방식으로 주석
//     */
//     <ScrollView style={styles.container}>
//         <StatusBar style="black" />
//         {/* <Text style={styles.title}>나만의 꿀팁</Text> */}
//         <Text style={styles.weather}>오늘의 날씨: {weather.temp + '°C   ' + weather.condition} </Text>
//         <TouchableOpacity style={styles.aboutButton} onPress={()=>{navigation.navigate('AboutPage')}}>
//           <Text style={styles.aboutButtonText}>소개 페이지</Text>
//         </TouchableOpacity>
//         <Image style={styles.mainImage} source={main}/>
//         <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
//             <TouchableOpacity style={styles.middleButtonAll} onPress={()=>{category('전체보기')}}><Text style={styles.middleButtonTextAll}>전체보기</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('생활')}}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton02} onPress={()=>{category('재테크')}}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton03} onPress={()=>{category('반려견')}}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton04} onPress={()=>{navigation.navigate('LikePage')}}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
//         </ScrollView>
//         <View style={styles.cardContainer}>
//             {/* 하나의 카드 영역을 나타내는 View */}
//             {
//             cateState.map((content,i)=>{
//                 return (<Card content={content} key={i} navigation={navigation}/>)
//             })
//             }
            
//         </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     //앱의 배경 색
//     backgroundColor: '#fff',
//   },
//   title: {
//     //폰트 사이즈
//     fontSize: 20,
//     //폰트 두께
//     fontWeight: '700',
//     //위 공간으로 부터 이격
//     marginTop:50,
//     //왼쪽 공간으로 부터 이격
//     marginLeft:20
//   },
// weather:{
//     alignSelf:"flex-end",
//     paddingRight:20
//   },
//   mainImage: {
//     //컨텐츠의 넓이 값
//     width:'90%',
//     //컨텐츠의 높이 값
//     height:200,
//     //컨텐츠의 모서리 구부리기
//     borderRadius:10,
//     marginTop:20,
//     //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
//     //각 속성의 값들은 공식문서에 고대로~ 나와 있음
//     alignSelf:"center"
//   },
//   middleContainer:{
//     marginTop:20,
//     marginLeft:10,
//     height:60
//   },
//   middleButtonAll: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#20b2aa",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton01: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fdc453",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton02: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fe8d6f",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton03: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#9adbc5",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton04: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#f886a8",
//     borderRadius:15,
//     margin:7
//   },
//   middleButtonText: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   middleButtonTextAll: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   cardContainer: {
//     marginTop:10,
//     marginLeft:10
//   },
//   aboutButton: {
//     backgroundColor:"pink",
//     width:100,
//     height:40,
//     borderRadius:10,
//     alignSelf:"flex-end",
//     marginRight:20,
//     marginTop:10
//   },
//   aboutButtonText: {
//     color:"#fff",
//     textAlign:"center",
//     marginTop:10
//   }


// });












// import React,{useState,useEffect} from 'react';       //내 위치 호출
// import main from '../assets/main.png';
// import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
// import data from '../data.json';
// import Card from '../components/Card';
// import Loading from '../components/Loading';
// import { StatusBar } from 'expo-status-bar';
// import * as Location from "expo-location";

// export default function MainPage({navigation,route}) {
//   console.disableYellowBox = true;
//   //return 구문 밖에서는 슬래시 두개 방식으로 주석

//   //기존 꿀팁을 저장하고 있을 상태
//   const [state,setState] = useState([])
//   //카테고리에 따라 다른 꿀팁을 그때그때 저장관리할 상태
//   const [cateState,setCateState] = useState([])

//   //컴포넌트에 상태를 여러개 만들어도 됨
//   //관리할 상태이름과 함수는 자유자재로 정의할 수 있음
//   //초기 상태값으로 리스트, 참거짓형, 딕셔너리, 숫자, 문자 등등 다양하게 들어갈 수 있음.
//   const [ready,setReady] = useState(true)

//   useEffect(()=>{
	   
//     //뒤의 1000 숫자는 1초를 뜻함
//     //1초 뒤에 실행되는 코드들이 담겨 있는 함수
//     setTimeout(()=>{
//         //헤더의 타이틀 변경
//         navigation.setOptions({
//             title:'나만의 꿀팁'
//         })
//         //꿀팁 데이터로 모두 초기화 준비
//         let tip = data.tip;
//         setState(tip)
//         setCateState(tip)
//         getLocation()
//         setReady(false)
//     },1000)

    
//   },[])

//   const getLocation = async () => {
//     //수많은 로직중에 에러가 발생하면
//     //해당 에러를 포착하여 로직을 멈추고,에러를 해결하기 위한 catch 영역 로직이 실행
//     try {
//       //자바스크립트 함수의 실행순서를 고정하기 위해 쓰는 async,await
//       await Location.requestPermissionsAsync();
//       const locationData= await Location.getCurrentPositionAsync();
//       console.log(locationData)

//     } catch (error) {
//       //혹시나 위치를 못가져올 경우를 대비해서, 안내를 준비합니다
//       Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껏다 켜볼까요?");
//     }
//   }

//     const category = (cate) => {
//         if(cate == "전체보기"){
//             //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
//             setCateState(state)
//         }else{
//             setCateState(state.filter((d)=>{
//                 return d.category == cate
//             }))
//         }
//     }


// 	let todayWeather = 10 + 17;
//     let todayCondition = "흐림"

// 	//처음 ready 상태값은 true 이므로 ? 물음표 바로 뒤에 값이 반환(그려짐)됨
//   //useEffect로 인해 데이터가 준비되고, ready 값이 변경되면 : 콜론 뒤의 값이 반환(그려짐)
//   return ready ? <Loading/> :  (
//     /*
//       return 구문 안에서는 {슬래시 + * 방식으로 주석
//     */
//     <ScrollView style={styles.container}>
//         <StatusBar style="black" />
//         {/* <Text style={styles.title}>나만의 꿀팁</Text> */}
//         <Text style={styles.weather}>오늘의 날씨: {todayWeather + '°C ' + todayCondition} </Text>
//         <TouchableOpacity style={styles.aboutButton} onPress={()=>{navigation.navigate('AboutPage')}}>
//           <Text style={styles.aboutButtonText}>소개 페이지</Text>
//         </TouchableOpacity>
//         <Image style={styles.mainImage} source={main}/>
//         <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
//             <TouchableOpacity style={styles.middleButtonAll} onPress={()=>{category('전체보기')}}><Text style={styles.middleButtonTextAll}>전체보기</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('생활')}}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton02} onPress={()=>{category('재테크')}}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton03} onPress={()=>{category('반려견')}}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton04} onPress={()=>{navigation.navigate('LikePage')}}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
//         </ScrollView>
//         <View style={styles.cardContainer}>
//             {/* 하나의 카드 영역을 나타내는 View */}
//             {
//             cateState.map((content,i)=>{
//                 return (<Card content={content} key={i} navigation={navigation}/>)
//             })
//             }
            
//         </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     //앱의 배경 색
//     backgroundColor: '#fff',
//   },
//   title: {
//     //폰트 사이즈
//     fontSize: 20,
//     //폰트 두께
//     fontWeight: '700',
//     //위 공간으로 부터 이격
//     marginTop:50,
//     //왼쪽 공간으로 부터 이격
//     marginLeft:20
//   },
// weather:{
//     alignSelf:"flex-end",
//     paddingRight:20
//   },
//   mainImage: {
//     //컨텐츠의 넓이 값
//     width:'90%',
//     //컨텐츠의 높이 값
//     height:200,
//     //컨텐츠의 모서리 구부리기
//     borderRadius:10,
//     marginTop:20,
//     //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
//     //각 속성의 값들은 공식문서에 고대로~ 나와 있음
//     alignSelf:"center"
//   },
//   middleContainer:{
//     marginTop:20,
//     marginLeft:10,
//     height:60
//   },
//   middleButtonAll: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#20b2aa",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton01: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fdc453",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton02: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fe8d6f",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton03: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#9adbc5",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton04: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#f886a8",
//     borderRadius:15,
//     margin:7
//   },
//   middleButtonText: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   middleButtonTextAll: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   cardContainer: {
//     marginTop:10,
//     marginLeft:10
//   },
//   aboutButton: {
//     backgroundColor:"pink",
//     width:100,
//     height:40,
//     borderRadius:10,
//     alignSelf:"flex-end",
//     marginRight:20,
//     marginTop:10
//   },
//   aboutButtonText: {
//     color:"#fff",
//     textAlign:"center",
//     marginTop:10
//   }


// });












// import React,{useState,useEffect} from 'react';         
// import main from '../assets/main.png';
// import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
// import data from '../data.json';
// import Card from '../components/Card';
// import Loading from '../components/Loading';
// import { StatusBar } from 'expo-status-bar';

// export default function MainPage({navigation,route}) {
//   console.disableYellowBox = true;
//   //return 구문 밖에서는 슬래시 두개 방식으로 주석

//   //기존 꿀팁을 저장하고 있을 상태
//   const [state,setState] = useState([])
//   //카테고리에 따라 다른 꿀팁을 그때그때 저장관리할 상태
//   const [cateState,setCateState] = useState([])

//   //컴포넌트에 상태를 여러개 만들어도 됨
//   //관리할 상태이름과 함수는 자유자재로 정의할 수 있음
//   //초기 상태값으로 리스트, 참거짓형, 딕셔너리, 숫자, 문자 등등 다양하게 들어갈 수 있음.
//   const [ready,setReady] = useState(true)

//   useEffect(()=>{
	   
//     //뒤의 1000 숫자는 1초를 뜻함
//     //1초 뒤에 실행되는 코드들이 담겨 있는 함수
//     setTimeout(()=>{
//         //헤더의 타이틀 변경
//         navigation.setOptions({
//             title:'나만의 꿀팁'
//         })
//         //꿀팁 데이터로 모두 초기화 준비
//         let tip = data.tip;
//         setState(tip)
//         setCateState(tip)
//         setReady(false)
//     },1000)

    
//   },[])

//     const category = (cate) => {
//         if(cate == "전체보기"){
//             //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
//             setCateState(state)
//         }else{
//             setCateState(state.filter((d)=>{
//                 return d.category == cate
//             }))
//         }
//     }


// 	let todayWeather = 10 + 17;
//     let todayCondition = "흐림"

// 	//처음 ready 상태값은 true 이므로 ? 물음표 바로 뒤에 값이 반환(그려짐)됨
//   //useEffect로 인해 데이터가 준비되고, ready 값이 변경되면 : 콜론 뒤의 값이 반환(그려짐)
//   return ready ? <Loading/> :  (
//     /*
//       return 구문 안에서는 {슬래시 + * 방식으로 주석
//     */
//     <ScrollView style={styles.container}>
//         <StatusBar style="black" />
//         {/* <Text style={styles.title}>나만의 꿀팁</Text> */}
//         <Text style={styles.weather}>오늘의 날씨: {todayWeather + '°C ' + todayCondition} </Text>
//         <TouchableOpacity style={styles.middleButton} onPress={()=>{navigation.navigate('AboutPage')}}><Text style={styles.middleButtonText}>소개 페이지</Text></TouchableOpacity>
//         <Image style={styles.mainImage} source={main}/>
//         <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
//             <TouchableOpacity style={styles.middleButtonAll} onPress={()=>{category('전체보기')}}><Text style={styles.middleButtonTextAll}>전체보기</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('생활')}}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton02} onPress={()=>{category('재테크')}}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton03} onPress={()=>{category('반려견')}}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton04} onPress={()=>{navigation.navigate('LikePage')}}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
//         </ScrollView>
//         <View style={styles.cardContainer}>
//             {/* 하나의 카드 영역을 나타내는 View */}
//             {
//             cateState.map((content,i)=>{
//                 return (<Card content={content} key={i} navigation={navigation}/>)
//             })
//             }
            
//         </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     //앱의 배경 색
//     backgroundColor: '#fff',
//   },
//   title: {
//     //폰트 사이즈
//     fontSize: 20,
//     //폰트 두께
//     fontWeight: '700',
//     //위 공간으로 부터 이격
//     marginTop:50,
//     //왼쪽 공간으로 부터 이격
//     marginLeft:20
//   },
// weather:{
//     alignSelf:"flex-end",
//     paddingRight:20
//   },
//   mainImage: {
//     //컨텐츠의 넓이 값
//     width:'90%',
//     //컨텐츠의 높이 값
//     height:200,
//     //컨텐츠의 모서리 구부리기
//     borderRadius:10,
//     marginTop:15,
//     //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
//     //각 속성의 값들은 공식문서에 고대로~ 나와 있음
//     alignSelf:"center"
//   },
//   middleContainer:{
//     marginTop:20,
//     marginLeft:10,
//     height:60
//   },
//   middleButton:{
//     alignSelf:"flex-end",
//     width:110,
//     height:50,
//     padding:15,
//     borderRadius:15,
//     margin:7,
//     backgroundColor:"pink",
//     borderColor:"deeppink",
//   },
//   middleButtonAll: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#20b2aa",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton01: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fdc453",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton02: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fe8d6f",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton03: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#9adbc5",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton04: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#f886a8",
//     borderRadius:15,
//     margin:7
//   },
//   middleButtonText: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   middleButtonTextAll: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   cardContainer: {
//     marginTop:10,
//     marginLeft:10
//   },


// });








// import React,{useState,useEffect} from 'react';
// import main from '../assets/main.png';
// import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
// import data from '../data.json';
// import Card from '../components/Card';
// import Loading from '../components/Loading';
// import { StatusBar } from 'expo-status-bar';

// export default function MainPage() {
//   console.disableYellowBox = true;
//   //return 구문 밖에서는 슬래시 두개 방식으로 주석

//   //기존 꿀팁을 저장하고 있을 상태
//   const [state,setState] = useState([])
//   //카테고리에 따라 다른 꿀팁을 그때그때 저장관리할 상태
//   const [cateState,setCateState] = useState([])

//   //컴포넌트에 상태를 여러개 만들어도 됨
//   //관리할 상태이름과 함수는 자유자재로 정의할 수 있음
//   //초기 상태값으로 리스트, 참거짓형, 딕셔너리, 숫자, 문자 등등 다양하게 들어갈 수 있음.
//   const [ready,setReady] = useState(true)

//   useEffect(()=>{
           
//     //뒤의 1000 숫자는 1초를 뜻함
//     //1초 뒤에 실행되는 코드들이 담겨 있는 함수
//     setTimeout(()=>{
//         //꿀팁 데이터로 모두 초기화 준비
//         let tip = data.tip;
//         setState(tip)
//         setCateState(tip)
//         setReady(false)
//     },1000)

    
//   },[])

//     const category = (cate) => {
//         if(cate == "전체보기"){
//             //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
//             setCateState(state)
//         }else{
//             setCateState(state.filter((d)=>{
//                 return d.category == cate
//             }))
//         }
//     }


//         let todayWeather = 10 + 17;
//     let todayCondition = "흐림"

//         //처음 ready 상태값은 true 이므로 ? 물음표 바로 뒤에 값이 반환(그려짐)됨
//   //useEffect로 인해 데이터가 준비되고, ready 값이 변경되면 : 콜론 뒤의 값이 반환(그려짐)
//   return ready ? <Loading/> :  (
//     /*
//       return 구문 안에서는 {슬래시 + * 방식으로 주석
//     */
//     <ScrollView style={styles.container}>
//         <StatusBar style="black" />
//         {/* <Text style={styles.title}>나만의 꿀팁</Text> */}
//         <Text style={styles.weather}>오늘의 날씨: {todayWeather + '°C ' + todayCondition} </Text>
//         <Image style={styles.mainImage} source={main}/>
//         <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
//             <TouchableOpacity style={styles.middleButtonAll} onPress={()=>{category('전체보기')}}><Text style={styles.middleButtonTextAll}>전체보기</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('생활')}}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton02} onPress={()=>{category('재테크')}}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton03} onPress={()=>{category('반려견')}}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
//             <TouchableOpacity style={styles.middleButton04} onPress={()=>{category('꿀팁 찜')}}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
//         </ScrollView>
//         <View style={styles.cardContainer}>
//             {/* 하나의 카드 영역을 나타내는 View */}
//             {
//             cateState.map((content,i)=>{
//                 return (<Card content={content} key={i}/>)
//             })
//             }
            
//         </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     //앱의 배경 색
//     backgroundColor: '#fff',
//   },
//   title: {
//     //폰트 사이즈
//     fontSize: 20,
//     //폰트 두께
//     fontWeight: '700',
//     //위 공간으로 부터 이격
//     marginTop:50,
//     //왼쪽 공간으로 부터 이격
//     marginLeft:20
//   },
// weather:{
//     marginTop:20,
//     alignSelf:"flex-end",
//     paddingRight:20
//   },
//   mainImage: {
//     //컨텐츠의 넓이 값
//     width:'90%',
//     //컨텐츠의 높이 값
//     height:200,
//     //컨텐츠의 모서리 구부리기
//     borderRadius:10,
//     marginTop:20,
//     //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
//     //각 속성의 값들은 공식문서에 고대로~ 나와 있음
//     alignSelf:"center"
//   },
//   middleContainer:{
//     marginTop:20,
//     marginLeft:10,
//     height:60
//   },
//   middleButtonAll: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#20b2aa",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton01: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fdc453",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton02: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fe8d6f",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton03: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#9adbc5",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton04: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#f886a8",
//     borderRadius:15,
//     margin:7
//   },
//   middleButtonText: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   middleButtonTextAll: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   cardContainer: {
//     marginTop:10,
//     marginLeft:10
//   },


// });












// import React,{useState,useEffect} from 'react';          //cateState가 왜 있는지 몰라서 맘대로 바꿈
// import main from '../assets/main.png';
// import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
// import data from '../data.json';
// import Card from '../components/Card';
// import Loading from '../components/Loading';


// export default function MainPage() {
//   console.disableYellowBox = true;
//   //return 구문 밖에서는 슬래시 두개 방식으로 주석

//   //기존 꿀팁을 저장하고 있을 상태
//   const [state,setState] = useState([])
//   //카테고리에 따라 다른 꿀팁을 그때그때 저장관리할 상태

//   //컴포넌트에 상태를 여러개 만들어도 됨
//   //관리할 상태이름과 함수는 자유자재로 정의할 수 있음
//   //초기 상태값으로 리스트, 참거짓형, 딕셔너리, 숫자, 문자 등등 다양하게 들어갈 수 있음.
//   const [ready,setReady] = useState(true)
//   let tip = data.tip;
//   useEffect(()=>{
	   
//     //뒤의 1000 숫자는 1초를 뜻함
//     //1초 뒤에 실행되는 코드들이 담겨 있는 함수
//     setTimeout(()=>{
//         //꿀팁 데이터로 모두 초기화 준비     
//         setState(tip)

//         setReady(false)
//     },1000)

    
//   },[])

//     const category = (cate) => {
//         if(cate == "전체보기"){
//             //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
//             setState(tip)
//         }else{
//             setState(tip.filter((d)=>{        //filter는 조건문의 일종으로 return에 있는 조건이 참이면 그 값들을 포함한 리스트를 반환
//                 return d.category == cate
//             }))
//         }
//     }


// 	let todayWeather = 10 + 17;
//   let todayCondition = "흐림"

// 	//처음 ready 상태값은 true 이므로 ? 물음표 바로 뒤에 값이 반환(그려짐)됨
//   //useEffect로 인해 데이터가 준비되고, ready 값이 변경되면 : 콜론 뒤의 값이 반환(그려짐)
//   return ready ? <Loading/> :  (
//     /*
//       return 구문 안에서는 {슬래시 + * 방식으로 주석
//     */
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>나만의 꿀팁</Text>
// 			 <Text style={styles.weather}>오늘의 날씨: {todayWeather + '°C ' + todayCondition} </Text>
//       <Image style={styles.mainImage} source={main}/>
//       <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
//         <TouchableOpacity style={styles.middleButtonAll} onPress={()=>{category('전체보기')}}><Text style={styles.middleButtonTextAll}>전체보기</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('생활')}}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton02} onPress={()=>{category('재테크')}}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton03} onPress={()=>{category('반려견')}}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton04} onPress={()=>{category('꿀팁 찜')}}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
//       </ScrollView>
//       <View style={styles.cardContainer}>
//          {/* 하나의 카드 영역을 나타내는 View */}
//          {
//           state.map((content,i)=>{
//             return (<Card content={content} key={i}/>)
//           })
//         }
        
//       </View>
   
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     //앱의 배경 색
//     backgroundColor: '#fff',
//   },
//   title: {
//     //폰트 사이즈
//     fontSize: 20,
//     //폰트 두께
//     fontWeight: '700',
//     //위 공간으로 부터 이격
//     marginTop:50,
//     //왼쪽 공간으로 부터 이격
//     marginLeft:20
//   },
// weather:{
//     alignSelf:"flex-end",
//     paddingRight:20
//   },
//   mainImage: {
//     //컨텐츠의 넓이 값
//     width:'90%',
//     //컨텐츠의 높이 값
//     height:200,
//     //컨텐츠의 모서리 구부리기
//     borderRadius:10,
//     marginTop:20,
//     //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
//     //각 속성의 값들은 공식문서에 고대로~ 나와 있음
//     alignSelf:"center"
//   },
//   middleContainer:{
//     marginTop:20,
//     marginLeft:10,
//     height:60
//   },
//   middleButtonAll: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#20b2aa",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton01: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fdc453",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton02: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fe8d6f",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton03: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#9adbc5",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton04: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#f886a8",
//     borderRadius:15,
//     margin:7
//   },
//   middleButtonText: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   middleButtonTextAll: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   cardContainer: {
//     marginTop:10,
//     marginLeft:10
//   },


// });














// import React,{useState,useEffect} from 'react';
// import main from '../assets/main.png';
// import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
// import data from '../data.json';
// import Card from '../components/Card';
// import Loading from '../components/Loading';


// export default function MainPage() {
//   console.disableYellowBox = true;
//   //return 구문 밖에서는 슬래시 두개 방식으로 주석

//   const [state,setState] = useState([])

// 	//컴포넌트에 상태를 여러개 만들어도 됨
//   //관리할 상태이름과 함수는 자유자재로 정의할 수 있음
//   //초기 상태값으로 리스트, 참거짓형, 딕셔너리, 숫자, 문자 등등 다양하게 들어갈 수 있음.
//   const [ready,setReady] = useState(true)
 
//   useEffect(()=>{
	   
// 		//뒤의 1000 숫자는 1초를 뜻함
//     //1초 뒤에 실행되는 코드들이 담겨 있는 함수
//     setTimeout(()=>{
//        setState(data)
//        setReady(false)
        
//     },1000)
 
    
//   },[])

// //   let tip = data.tip;
//   let tip = state.tip;
// 	let todayWeather = 10 + 17;
//   let todayCondition = "흐림"

// 	//처음 ready 상태값은 true 이므로 ? 물음표 바로 뒤에 값이 반환(그려짐)됨
//   //useEffect로 인해 데이터가 준비되고, ready 값이 변경되면 : 콜론 뒤의 값이 반환(그려짐)
//   return ready ? <Loading/> :  (
//     /*
//       return 구문 안에서는 {슬래시 + * 방식으로 주석
//     */
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>나만의 꿀팁</Text>
// 			 <Text style={styles.weather}>오늘의 날씨: {todayWeather + '°C ' + todayCondition} </Text>
//       <Image style={styles.mainImage} source={main}/>
//       <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
//         <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton02}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton03}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton04}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
//       </ScrollView>
//       <View style={styles.cardContainer}>
//          {/* 하나의 카드 영역을 나타내는 View */}
//          {
//           tip.map((content,i)=>{
//             return (<Card content={content} key={i}/>)
//           },)
//         }
        
//       </View>
   
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     //앱의 배경 색
//     backgroundColor: '#fff',
//   },
//   title: {
//     //폰트 사이즈
//     fontSize: 20,
//     //폰트 두께
//     fontWeight: '700',
//     //위 공간으로 부터 이격
//     marginTop:50,
//     //왼쪽 공간으로 부터 이격
//     marginLeft:20
//   },
// weather:{
//     alignSelf:"flex-end",
//     paddingRight:20
//   },
//   mainImage: {
//     //컨텐츠의 넓이 값
//     width:'90%',
//     //컨텐츠의 높이 값
//     height:200,
//     //컨텐츠의 모서리 구부리기
//     borderRadius:10,
//     marginTop:20,
//     //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
//     //각 속성의 값들은 공식문서에 고대로~ 나와 있음
//     alignSelf:"center"
//   },
//   middleContainer:{
//     marginTop:20,
//     marginLeft:10,
//     height:60
//   },
//   middleButton01: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fdc453",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton02: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fe8d6f",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton03: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#9adbc5",
//     borderRadius:15,
//     margin:7
//   },
//   middleButtonText: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   middleButton04: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#f886a8",
//     borderRadius:15,
//     margin:7
//   },
//   cardContainer: {
//     marginTop:10,
//     marginLeft:10
//   },


// });







// import React from 'react';

// import main from '../assets/main.png';
// import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
// import data from '../data.json';
// import Card from '../components/Card';


// export default function MainPage() {
//   console.disableYellowBox = true;
//   //return 구문 밖에서는 슬래시 두개 방식으로 주석

//   let tip = data.tip;
// 	let todayWeather = 10 + 17;
//   let todayCondition = "흐림"
//   return (
//     /*
//       return 구문 안에서는 {슬래시 + * 방식으로 주석
//     */
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>나만의 꿀팁</Text>
// 			 <Text style={styles.weather}>오늘의 날씨: {todayWeather + '°C ' + todayCondition} </Text>
//       <Image style={styles.mainImage} source={main}/>
//       <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
//         <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton02}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton03}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton04}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
//       </ScrollView>
//       <View style={styles.cardContainer}>
//          {/* 하나의 카드 영역을 나타내는 View */}
//          {
//           tip.map((abc,i)=>{
//             return (<Card content={abc} key={i}/>)
//           })
//         }
        
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     //앱의 배경 색
//     backgroundColor: '#fff',
//   },
//   title: {
//     //폰트 사이즈
//     fontSize: 20,
//     //폰트 두께
//     fontWeight: '700',
//     //위 공간으로 부터 이격
//     marginTop:50,
//     //왼쪽 공간으로 부터 이격
//     marginLeft:20
//   },
//  weather:{
//     alignSelf:"flex-end",
//     paddingRight:20
//   },
//   mainImage: {
//     //컨텐츠의 넓이 값
//     width:'90%',
//     //컨텐츠의 높이 값
//     height:200,
//     //컨텐츠의 모서리 구부리기
//     borderRadius:10,
//     marginTop:20,
//     //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
//     //각 속성의 값들은 공식문서에 고대로~ 나와 있음
//     alignSelf:"center"
//   },
//   middleContainer:{
//     marginTop:20,
//     marginLeft:10,
//     height:60
//   },
//   middleButton01: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fdc453",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton02: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fe8d6f",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton03: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#9adbc5",
//     borderRadius:15,
//     margin:7
//   },
//   middleButtonText: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   middleButton04: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#f886a8",
//     borderRadius:15,
//     margin:7
//   },
//   cardContainer: {
//     marginTop:10,
//     marginLeft:10
//   },


// });





// import React from 'react';                  // 3항연산자 활용
// import main from '../assets/main.png';
// import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
// import data from '../data.json';
// export default function MainPage() {
//   console.disableYellowBox = true;
//   //return 구문 밖에서는 슬래시 두개 방식으로 주석

//   let tip = data.tip;
//   let todayWeather = 10 + 17;
//   let todayCondition = "흐림"

//   return (
//     /*
//       return 구문 안에서는 {슬래시 + * 방식으로 주석
//     */
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>나만의 꿀팁</Text>
//       <Text style={styles.weather}>오늘의 날씨: {todayWeather + '°C ' + todayCondition} </Text>
//       <Image style={styles.mainImage} source={main}/>
//       <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
//         <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton02}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton03}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton04}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
//       </ScrollView>
//       <View style={styles.cardContainer}>
//          {/* 하나의 카드 영역을 나타내는 View */}
//          { 
//           tip.map((content,i)=>{
//             return i % 2 == 0 ? (<View style={styles.cardEven} key={i}>
//               <Image style={styles.cardImage} source={{uri:content.image}}/>
//               <View style={styles.cardText}>
//                 <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
//                 <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
//                 <Text style={styles.cardDate}>{content.date}</Text>
//               </View>
//             </View>) : (<View style={styles.cardOdd} key={i}>
//                 <Image style={styles.cardImage} source={{uri:content.image}}/>
//                 <View style={styles.cardText}>
//                   <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
//                   <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
//                   <Text style={styles.cardDate}>{content.date}</Text>
//                 </View>
//               </View>)
            
//           })
//          }
        
//       </View>
   
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     //앱의 배경 색
//     backgroundColor: '#fff',
//   },
//   title: {
//     //폰트 사이즈
//     fontSize: 20,
//     //폰트 두께
//     fontWeight: '700',
//     //위 공간으로 부터 이격
//     marginTop:50,
//     //왼쪽 공간으로 부터 이격
//     marginLeft:20
//   },
//   weather:{
//     alignSelf:"flex-end",
//     paddingRight:20
//   },
//   mainImage: {
//     //컨텐츠의 넓이 값
//     width:'90%',
//     //컨텐츠의 높이 값
//     height:200,
//     //컨텐츠의 모서리 구부리기
//     borderRadius:10,
//     marginTop:20,
//     //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
//     //각 속성의 값들은 공식문서에 고대로~ 나와 있음
//     alignSelf:"center"
//   },
//   middleContainer:{
//     marginTop:20,
//     marginLeft:10,
//     height:60
//   },
//   middleButton01: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fdc453",
//     borderColor:"deeppink",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton02: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#fe8d6f",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton03: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#9adbc5",
//     borderRadius:15,
//     margin:7
//   },
//   middleButtonText: {
//     color:"#fff",
//     fontWeight:"700",
//     //텍스트의 현재 위치에서의 정렬 
//     textAlign:"center"
//   },
//   middleButton04: {
//     width:100,
//     height:50,
//     padding:15,
//     backgroundColor:"#f886a8",
//     borderRadius:15,
//     margin:7
//   },
//   cardContainer: {
//     marginTop:10,
//     marginLeft:10
//   },
//   card:{
//     flex:1,
//     //컨텐츠들을 가로로 나열
//     //세로로 나열은 column <- 디폴트 값임 
//     flexDirection:"row",
//     margin:10,
//     borderBottomWidth:0.5,
//     borderBottomColor:"#eee",
//     paddingBottom:10

//   },
//   cardImage: {
//     flex:1,
//     width:100,
//     height:100,
//     borderRadius:10,
//   },
//   cardText: {
//     flex:2,
//     flexDirection:"column",
//     marginLeft:10,
//   },
//   cardTitle: {
//     fontSize:20,
//     fontWeight:"700"
//   },
//   cardDesc: {
//     fontSize:15
//   },
//   cardDate: {
//     fontSize:10,
//     color:"#A6A6A6",
//   },
//   //카드 짝수 홀수에 따른 스타일 적용
//   cardEven:{
//     flex:1,
//     flexDirection:"row",
//     margin:10,
//     backgroundColor:"#FFFED7",
//     borderRadius:20,
//     borderBottomWidth:0.5,
//     borderBottomColor:"#eee",
//     paddingBottom:10
//   },
//   cardOdd:{
//     flex:1,
//     flexDirection:"row",
//     margin:10,
//     borderBottomWidth:0.5,
//     borderBottomColor:"#eee",
//     paddingBottom:10
//   },


// });