import React from 'react';
//이제 모든 페이지 컴포넌트들이 끼워져있는 책갈피를 메인에 둘예정이므로
//컴포넌트를 더이상 불러오지 않아도 됩니다.
// import MainPage from './pages/MainPage';
// import DetailPage from './pages/DetailPage';
import { StatusBar } from 'expo-status-bar';

//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'

export default function App() {

  console.disableYellowBox = true;

  return ( 
  <NavigationContainer>
    <StatusBar style="black" />
    <StackNavigator/>
 </NavigationContainer>);
}









// import React from 'react'
// import MainPage from './pages/MainPage'
// import AboutPage from './pages/AboutPage'
// import DetailPage from './pages/DetailPage'

// export default function App(){
//   return(<MainPage/> )
//   // return (<AboutPage/>)
//   // return (<DetailPage/>)
// }








// import React from 'react';                  // 3항연산자 활용
// import main from './assets/main.png';
// import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
// import data from './data.json';
// export default function App() {
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











// import React from 'react';                 //map을 이용
// import main from './assets/main.png';
// import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
// import data from './data.json';
// export default function App() {
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
//             return (<View style={styles.card} key={i}>
//               <Image style={styles.cardImage} source={{uri:content.image}}/>
//               <View style={styles.cardText}>
//                 <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
//                 <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
//                 <Text style={styles.cardDate}>{content.date}</Text>
//               </View>
//             </View>)
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


// });













// import React from 'react';                              //앱 화면 기초 활용
// import main from './assets/main.png'; // 이미지를 main이라는 이름으로 사용함
// import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
// export default function App() {
//   console.disableYellowBox = true;
//   //return 구문 밖에서는 슬래시 두개 방식으로 주석
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>나만의 꿀팁</Text>
//       <Image style={styles.mainImage} source = {main}/>
//       <ScrollView style={styles.middleContainer}  horizontal = {true}>
//         <TouchableOpacity style={styles.middleButton01}>
//           <Text style={styles.middleButtonText}>생활</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton02}>
//           <Text style={styles.middleButtonText}>재테크</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton03}>
//           <Text style={styles.middleButtonText}>반려견</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.middleButton04}>
//           <Text style={styles.middleButtonText}>꿀팁 찜</Text>
//         </TouchableOpacity>
//       </ScrollView>
//       <View style={styles.cardContainer}>
//         <View style={styles.card}>
//           <Image style={styles.cardImage} source={{uri:"https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Fpizza.png?alt=media&token=1a099927-d818-45d4-b48a-7906fd0d2ad3"}}/>
//           <View style={styles.cardText}>
//             <Text style={styles.cardTitle}>먹다 남은 피자를 촉촉하게!</Text>
//             <Text style={styles.cardDesc} numberOfLines={3}>
//                먹다 남은 피자는 수분이 날라가기 때문에 처음처럼 맛있게 먹을 수 없는데요. 이럴 경우 그릇에 물을 받아 전자레인지 안에서 1분 30초에서 2분 정도 함께 돌려주면 촉촉하게 먹을 수 있습니다. 물이 전자레인지 안에서 수증기를 일으키고, 피자에 촉촉함을 더해줍니다.
//                </Text>
//             <Text style={styles.cardDate}>2020.09.09</Text>
//           </View>
//         </View>

//       </View>
//     </ScrollView>
//   );

// }

// const styles = StyleSheet.create({
//   container : {
//     backgroundColor: "#fff",
//   },
//   title : {
//     fontSize : 20,
//     fontWeight : "700",
//     marginTop : 50,
//     marginLeft : 20
//   },
//   mainImage : {
//     width:"90%",
//     height:200,
//     borderRadius : 10,
//     marginTop:20,
//     alignSelf :"center" //alignItems는 flex로 영역 할당 받아야 가능 flex없으면 alignSelf
//   },
//   middleContainer:{
//     marginTop : 20,
//     marginLeft : 10,
//     height: 60,
//   },
//   middleButton01:{
//     width:100,
//     height : 50,
//     padding:15,
//     backgroundColor : "#fdc453",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton02:{
//     width:100,
//     height : 50,
//     padding:15,
//     backgroundColor : "#fe8d6f",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton03:{
//     width:100,
//     height : 50,
//     padding:15,
//     backgroundColor : "#9adbc5",
//     borderRadius:15,
//     margin:7
//   },
//   middleButton04:{
//     width:100,
//     height : 50,
//     padding:15,
//     backgroundColor : "#f886a8",
//     borderRadius:15,
//     margin:7
//   },
//   middleButtonText :{
//     color:"#fff",
//     fontWeight:"700",
//     textAlign:"center"
//   },
//   cardContainer:{
//     marginTop:10,
//     marginLeft:10,

//   },
//   card:{
//     flex:1,
//     flexDirection : "row",
//     margin : 10,
//   },
//   cardImage:{
//     flex : 1,
//     width:100,
//     height:110,
//     borderRadius:10
//   },
//   cardText:{
//     flex:2,
//     marginLeft: 10,
//   },
//   cardTitle:{
//     fontSize:20,
//     fontWeight:"700"
//   },
//   cardDesc:{
//     fontSize : 15
//   },
//   cardDate:{
//     fontSize:10
//   }
// });






// import React from 'react';                              //alignItems
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.containerOne}>

//       </View>
//       <View style={styles.containerTwo}>

//         <View style={styles.innerOne}>
//         <View style={styles.content}></View>
//         </View>


//         <View style={styles.innerTwo}>
//           <View style={styles.content}></View>
//         </View>

//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex:1
//   },
//   containerOne: {
//     flex:1,
//     backgroundColor:"red"
//   },
//   containerTwo:{
//     flex:2,
//     flexDirection:"row",
//     backgroundColor:"yellow"
//   },
//   innerOne: {
//     flex:1,
//     backgroundColor:"blue",
//     justifyContent : "flex-end"
//   },
//   innerTwo: {
//     flex:2,
//     backgroundColor:"orange",
//     justifyContent : "center",
//     alignItems:"flex-end"
//   },
//   content: {
//     width:50,
//     height:50,
//     backgroundColor:"#000"
//   }
// });















// import React from 'react';                        //justifyContent
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.containerOne}>

//       </View>
//       <View style={styles.containerTwo}>
//         <View style={styles.innerOne}>
         
//         </View>
//         <View style={styles.innerTwo}>
//           <Text>!!컨텐츠!!</Text>
//         </View>

//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex:1
//   },
//   containerOne: {
//     flex:1,
//     backgroundColor:"red"
//   },
//   containerTwo:{
//     flex:2,
//     flexDirection:"row",
//     backgroundColor:"yellow"
//   },
//   innerOne: {
//     flex:2,
//     backgroundColor:"blue"
//   },
//   innerTwo: {
//     flex:4,
//     justifyContent: "flex-end",
//     backgroundColor:"orange"
//   }
// });









// import React from 'react';                            //Flex 좌우로 나누기
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.containerOne}>

//       </View>

//       <View style={styles.containerTwo}>
//         <View style={styles.innerOne}>

//         </View>
//         <View style={styles.innerTwo}>

//         </View>

//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex:1
//   },
//   containerOne: {
//     flex:1,
//     backgroundColor:"red"
//   },
//   containerTwo:{
//     flex:2,
//     flexDirection:"row",
//     backgroundColor:"yellow"
//   },
//   innerOne: {
//     flex:2,
//     backgroundColor:"blue"
//   },
//   innerTwo: {
//     flex:2,
//     backgroundColor:"orange"
//   }
// });








// import React from 'react';                                //Flex 안에 Flex
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.containerOne}>

//       </View>
//       <View style={styles.containerTwo}>
//         <View style={styles.innerOne}>

//         </View>
//         <View style={styles.innerTwo}>

//         </View>

//       </View>
//     </View> 
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex:1
//   },
//   containerOne: {
//     flex:1,
//     backgroundColor:"red"
//   },
//   containerTwo:{
//     flex:2,
//     backgroundColor:"yellow"
//   },
//   innerOne: {
//     flex:2,
//     backgroundColor:"blue",
//     borderStyle:"solid",
//     borderColor : "#000",
//     borderWidth:2
//   },
//   innerTwo: {
//     flex:2,
//     backgroundColor:"orange",
//     borderStyle:"solid",
//     borderColor : "#000",
//     borderWidth:2
//   }
// });









// import React from 'react';                   //Flex 기본       
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.containerOne}>

//       </View>
//       <View style={styles.containerTwo}>

//       </View>
//     </View>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex:1
//   },
//   containerOne: {
//     flex:5,
//     backgroundColor:"red"
//   },
//   containerTwo:{
//     flex:7,
//     backgroundColor:"yellow"
//   }
// });







// import React from 'react';                                    //StyleSheet 활용
// import { StyleSheet, Text, View, Image } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>스파르타 코딩클럽!!</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     //영역을 잡는 속성입니다. 따로 자세히 다룹니다.
//     //flex: 1은 전체 화면을 가져간다는 뜻입니다
//     flex: 1,
//     //영역의 배경 색을 결정합니다
//     backgroundColor: '#fff',
//     //아래 두 속성은 영역 안의 컨텐츠들의 배치를 결정합니다. 
//     //flex를 자세히 다룰때 같이 자세히 다룹니다
//     justifyContent:"center",
//     alignContent:"center"
//   },
//   textContainer: {
//     //영역의 바깥 공간 이격을 뜻합니다(하단 이미지 참조)
//     margin:10,
//     //영역 안의 컨텐츠 이격 공간을 뜻합니다(하단 이미지 참조)
//     padding: 10,
//     //테두리의 구부러짐을 결정합니다. 지금 보면 조금 둥글죠?
//     borderRadius:10,
//     //테두리의 두께를 결정합니다
//     borderWidth:2,
//     //테두리 색을 결정합니다
//     borderColor:"#000",
//     //테구리 스타일을 결정합니다. 실선은 solid 입니다
//     borderStyle:"dotted",

//   },
//   textStyle: {
//     //글자 색을 결정합니다. rgb, 값 이름, 색상코드 모두 가능합니다
//     color:"red",
//     //글자의 크기를 결정합니다
//     fontSize:20,
//     //글자의 두께를 결정합니다  문자로 입력받고 100단위로 입력 가능
//     fontWeight:"700",
//     //가로기준으로 글자의 위치를 결정합니다
//     textAlign:"center"
//   }
// });







// import React from 'react';                                     //외부이미지 활용
// import { StyleSheet, Text, View, Image } from 'react-native';
// //이렇게 상단에 가져와 사용할 이미지를 불러옵니다
// import favicon from "./assets/favicon.png"

// export default function App() {
//   return (
//     <View style={styles.container}>
// 			{/*이미지 태그 soruce 부분에 가져온 미지 이름을 넣습니다 */}
//       <Image 
//         source={{uri:'https://images.unsplash.com/photo-1424819827928-55f0c8497861?fit=crop&w=600&h=600%27'}}
// 				// 사용설명서에 나와 있는 resizeMode 속성 값을 그대로 넣어 적용합니다
//         resizeMode={"cover"}
//         style={styles.imageStyle}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     //혹시 미리 궁금하신 분들을 위해 언급하자면,
//     //justifyContent와 alignContent는 영역 안에 있는 콘텐츠들을 정렬합니다
//     justifyContent:"center",
//     alignContent:"center"
//   },
//   imageStyle: {
//     width:"100%",
//     height:"100%",
//     alignItems:"center",
//     justifyContent:"center"
//   }
// });









// import React from 'react';                             //내장 이미지 활용
// import { StyleSheet, Text, View, Image } from 'react-native';
// //이렇게 상단에 가져와 사용할 이미지를 불러옵니다
// import favicon from "./assets/favicon.png"

// export default function App() {
//   return (
//     <View style={styles.container}>
// 			{/*이미지 태그 soruce 부분에 가져온 미지 이름을 넣습니다 */}
//       <Image 
//         source={favicon}
// 				// 사용설명서에 나와 있는 resizeMode 속성 값을 그대로 넣어 적용합니다
//         resizeMode={"repeat"}
//         style={styles.imageStyle}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     //혹시 미리 궁금하신 분들을 위해 언급하자면,
//     //justifyContent와 alignContent는 영역 안에 있는 콘텐츠들을 정렬합니다
//     justifyContent:"center",
//     alignContent:"center"
//   },
//   imageStyle: {
//     width:"100%",
//     height:"100%",
//     alignItems:"center",
//     justifyContent:"center"
//   }
// });









// import React from 'react';          //영역 버튼화..?
// import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

// export default function App() {
//   const customAlert = () => {
//     Alert.alert("TouchableOpacity에도 onPress 속성이 있습니다")
//   }
//   return (
//     <ScrollView style={styles.container}>
//       <TouchableOpacity style={styles.textContainer} onPress={customAlert}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.textContainer} onPress={customAlert}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.textContainer} onPress={customAlert}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.textContainer} onPress={customAlert}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.textContainer} onPress={customAlert}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.textContainer} onPress={customAlert}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.textContainer} onPress={customAlert}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   textContainer: {
//     height:100,
//     borderColor:'#000',
//     borderWidth:1,
//     borderRadius:10,
//     margin:10,
//   },
//   textStyle: {
//     textAlign:"center"
//   }
// });










// import React from 'react';                //버튼 태그 활용
// import { StyleSheet, Text, View, Button, Alert } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>아래 버튼을 눌러주세요</Text>
//         {/* 버튼 onPress 속성에 일반 함수를 연결 할 수 있습니다. */}
//         <Button 
//           style={styles.buttonStyle} 
//           title="버튼입니다 "     //버튼 내용
//           color="#f194ff" 
//           onPress={function(){
//             Alert.alert('팝업 알람입니다!!')
//           }}
//         />
//         {/* ES6 문법으로 배웠던 화살표 함수로 연결 할 수도 있습니다. */}
//         <Button 
//             style={styles.buttonStyle} 
//             title="버튼입니다 "
//             color="#FF0000" 
//             onPress={()=>{
//               Alert.alert('팝업 알람입니다!!')
//             }}
//           />
//           </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   textContainer: {
//     height:100,
//     margin:10,
//   },
//   textStyle: {
//     textAlign:"center"
//   },
// });









// import React from 'react'; // 스크롤 가능
// import { StyleSheet, Text, View, ScrollView/* 이 태그 하나가 모든걸 해결 */ } from 'react-native';

// export default function App() {
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   textContainer: {
//     height:100,
//     borderColor:'#000',
//     borderWidth:1,
//     borderRadius:10,
//     margin:10,
//   },
//   textStyle: {
//     textAlign:"center"
//   }
// });








// import React from 'react';                              //화면을 넘처서 보게 해주는 스크롤 뷰
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//                 //각 태그들에는 style이라는 속성을 갖습니다.
//                 //이 속성은 파일 최하단에 작성한 스타일 코드 객체의 키 값을 부여해
//     // 엘리먼트들에 스타일을 줄 수 있습니다.
//     //이는 JSX문법을 배우고 난 다음 더 자세히 다룹니다.
//     <View style={styles.container}>
//                         {/* //보인 영역을 갖는 엘리먼트 7가 반복적으로 쓰였습니다. */}
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
//       </View>
//     </View>
//   );
// }

// //엑스트가 영역을 갖고, 가운데 정렬도 하며, 테두리 스타일을 갖게 끔 하는 코드입니다.
// //JSX를 마저 배우고 스타일에 대해 자세히 다루니
// //걱정 안해도 좋습니다!
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   textContainer: {
//     height:100,
//     borderColor:'#000',
//     borderWidth:1,
//     borderRadius:10,
//     margin:10,
//   },
//   textStyle: {
//     textAlign:"center"
//   }
// });







// import { StatusBar } from 'expo-status-bar';               //화면 색 설정
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.subContainerOne}></View>
//       <View style={styles.subContainerTwo}></View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   subContainerOne: {
//     flex:1,
//     backgroundColor:"yellow"
//   },
//   subContainerTwo: {
//     flex:1,
//     backgroundColor:"green"
//   }
// });







// import React from 'react';                                  // 화면에 문자 출력
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>문자는 Text 태그 사이에 작성!!</Text>
//       <Text>문자는 Text 태그 사이에 작성!!</Text>
//       <Text>문자는 Text 태그 사이에 작성!!</Text>
//       <Text>문자는 Text 태그 사이에 작성!!</Text>
//       <Text>문자는 Text 태그 사이에 작성!!</Text>
//       <Text>문자는 Text 태그 사이에 작성!!</Text>
//       <Text>문자는 Text 태그 사이에 작성!!</Text>
//       <Text>문자는 Text 태그 사이에 작성!!</Text>
//       <Text>문자는 Text 태그 사이에 작성!!</Text>
//       <Text>문자는 Text 태그 사이에 작성!!</Text>
//       <Text>문자는 Text 태그 사이에 작성!!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });