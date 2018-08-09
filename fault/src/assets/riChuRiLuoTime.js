var zao,wan,yearjs,monthjs,dayjs,riseSetForm_mos_selectedIndex;
var eqTimejs;//riseSetForm["eqTime"].value
var solarDecjs;//riseSetForm["solarDec"].value
var shiqu;//latLongForm["hrsToGMT"].value 
var latDegjs;//f["latDeg"].value
var latMinjs;//f["latMin"].value == latLongForm["latMin"].value
var latSecjs;//f["latSec"].value == latLongForm["latSec"].value
var lonMinjs;//f["lonMin"].value == latLongForm["lonMin"].value
var lonSecjs;//f["lonSec"].value == latLongForm["lonSec"].value
var lonDegjs;//f["lonDeg"].value == latLongForm["lonDeg"].value
var latDegjs;//latLongForm["latDeg"].value

var utcsunrisejs;//riseSetForm["utcsunrise"].value //日出世界时
var solnoonjs;//riseSetForm["solnoon"].value //正午时间当地时
var utcsolnoonjs;//riseSetForm["utcsolnoon"].value //正午时间世界时
//输出日出日落时间
var sunrisejsD;//输出时间标签的id的text()方法; //riseSetForm["sunrise"].value //日出当地时id
var sunrisejs="js_sunrise";//输出时间标签的id的text()方法; //riseSetForm["sunrise"].value //日出当地时id
var sunsetjsd;//输出时间标签的id的text()方法;  //riseSetForm["sunset"].value  //日落当地时id
var sunsetjs="js_sunset";//输出时间标签的id的text()方法;  //riseSetForm["sunset"].value  //日落当地时id

$(function(){
	latDegjs='29.3';//景德镇经纬度；city("景德镇",29.3,-117.2,-8);
	lonDegjs='-117.2';//景德镇经纬度；city("景德镇",29.3,-117.2,-8);
	shiqu='-8';//时区,中国为-8。需要不在此时区时变动
//	calcSun(riseSetForm, latLongForm, 0, 51);
	var date=new Date();
	yearjs=date.getFullYear();
	monthjs=date.getMonth();
	dayjs=date.getDate();
	riseSetForm_mos_selectedIndex=monthjs;//月份 1月==0，2月==1
	calcSun(" ", " ", 0, 51);
});
//输出日出日落值
function js_sunsetjs_J(val){
	$("#"+sunsetjs).text(val);//sunsetjs  id值见上面定义末尾
}
function js_sunrisejs_J(val){
	$("#"+sunrisejs).text(val);//sunsetjs  id值见上面定义末尾
}

//计算日出日落开始
	function month(name, numdays, abbr) 
	{
		this.name = name;
		this.numdays = numdays;
		this.abbr = abbr;
	}
	function ans(daySave,value)
	{
		this.daySave = daySave;
		this.value = value;
	}
	function city(name, lat, lng, zoneHr) 
	{
		this.name = name;
		this.lat = lat;
		this.lng = lng;
		this.zoneHr = zoneHr;
	}
	var monthList = new Array();	//	list of months and days for non-leap year
	var i = 0;
	monthList[i++] = new month("一月", 31, "Jan");
	monthList[i++] = new month("二月", 28, "Feb");
	monthList[i++] = new month("三月", 31, "Mar");
	monthList[i++] = new month("四月", 30, "Apr");
	monthList[i++] = new month("五月", 31, "May");
	monthList[i++] = new month("六月", 30, "Jun");
	monthList[i++] = new month("七月", 31, "Jul");
	monthList[i++] = new month("八月", 31, "Aug");
	monthList[i++] = new month("九月", 30, "Sep");
	monthList[i++] = new month("十月", 31, "Oct");
	monthList[i++] = new month("十一月", 30, "Nov");
	monthList[i++] = new month("十二月", 31, "Dec");
	var YesNo = new Array();	//Daylight Saving array	
	i=0;
	YesNo[i++] = new ans("No",0);
	YesNo[i++] = new ans("Yes",60);
	var City = new Array();

	j = 0;
	City[j++] = new city("",0,0,0);
	City[j++] = new city("中国城市",0,0,0);
	City[j++] = new city("北京", 39.9,-115.4,-8);
	City[j++] = new city("天津", 39.1,-116.2,-8);
	City[j++] = new city("上海", 31.2, -120.4,-8);
	City[j++] = new city("石家庄",38.0,-113.4,-8);
	City[j++] = new city("太原", 37.8,-111.5,-8);
	City[j++] = new city("呼和浩特",40.8,-110.7,-8);
	City[j++] = new city("大连", 38.9,-120.6,-8);
	City[j++] = new city("沈阳",41.8,-122.4,-8);
	City[j++] = new city("长春",43.9,-124.3,-8);
	City[j++] = new city("吉林", 43.8,-125.5,-8);
	City[j++] = new city("哈尔滨",45.7,-125.6,-8);
	City[j++] = new city("济南",36.6,-117.0,-8);
	City[j++] = new city("青岛",36.0,-119.3,-8);
	City[j++] = new city("烟台",37.5,-120.4,-8);
	City[j++] = new city("西安",34.2,-107.9,-8);
	City[j++] = new city("兰州",36.0,-102.7,-8);
	City[j++] = new city("西宁",36.6,-100.8,-8);
	City[j++] = new city("南京",32.0,-117.7,-8);
	City[j++] = new city("无锡",31.5,-119.3,-8);
	City[j++] = new city("苏州",31.3,-119.6,-8);
	City[j++] = new city("徐州",34.2,-116.1,-8);
	City[j++] = new city("合肥",31.8,-116.6,-8);
	City[j++] = new city("杭州",30.2,-119.1,-8);
	City[j++] = new city("宁波",29.8,-120.5,-8);
	City[j++] = new city("南昌",28.6,-114.9,-8);
	City[j++] = new city("九江",29.7,-114.9,-8);
	City[j++] = new city("武汉",30.5,-113.2,-8);
	City[j++] = new city("长沙",28.2,111.9,-8);
	City[j++] = new city("湘潭",27.8,-111.9,-8);
	City[j++] = new city("乌鲁木齐",43.8,-86.6,-8);
	City[j++] = new city("哈密",42.8,-92.4,-8);
	City[j++] = new city("桂林",25.2,-109.2,-8);
	City[j++] = new city("柳州",24.3,-108.4,-8);
	City[j++] = new city("南宁",22.8,-107.3,-8);
	City[j++] = new city("广州",23.1,-112.2,-8);
	City[j++] = new city("汕头",23.3,-115.6,-8);
	City[j++] = new city("海口",20.0,-109.3,-8);
	City[j++] = new city("成都",30.6,-103.1,-8);
	City[j++] = new city("重庆",29.5,-105.5,-8);
	City[j++] = new city("贵阳",26.6,-105.7,-8);
	City[j++] = new city("昆明",25.0,-101.7,-8);
	City[j++] = new city("拉萨",29.6,-90.1,-8);
	City[j++] = new city("郑州",34.7,-112.6,-8);
	City[j++] = new city("洛阳",34.6,-111.4,-8);
	City[j++] = new city("福州",26.6,-118.3,-8);
	City[j++] = new city("厦门",24.4,-117.1,-8);
	City[j++] = new city("台北",25.0,-120.5,-8);	
	City[j++] = new city("高雄",22.0,-101.3,-8);
	City[j++] = new city("香港",22.25,-114.1667,-8);
	City[j++] = new city("景德镇",29.3,-117.2,-8);
	City[j++] = new city("世界城市",0,0,0);
	City[j++] = new city("纽约,美国",40.7167,74.0167,5);
	City[j++] = new city("柏林,德国",52.33, -13.30, -1);
	City[j++] = new city("孟买,印度", 18.9333, -72.8333, -5.5);
	City[j++] = new city("布宜诺斯艾利斯, 阿根廷", -34.60,58.45,3);
	City[j++] = new city("开罗,埃及", 30.10,-31.3667,-2);
	City[j++] = new city("开普敦,南非",-33.9167,-18.3667,-2);
	City[j++] = new city("加拉加斯,委内瑞拉", 10.50,66.9333,4);
	City[j++] = new city("赫尔辛基,芬兰", 60.1667, -24.9667,-2);
	City[j++] = new city("洛杉机,美国",34.05,118.233,8);
	City[j++] = new city("耶路撒冷,巴基斯坦", 31.7833, -35.2333, -2);
	City[j++] = new city("伦敦,英国", 51.50, 0.1667,0);
	City[j++] = new city("墨西哥城,墨西哥", 19.4,99.15,6);
	City[j++] = new city("莫斯科,俄罗斯", 55.75, -37.5833, -3);
	City[j++] = new city("新德里,印度",28.6, -77.2, -5.5);
	City[j++] = new city("渥太华,加拿大", 45.41667,75.7,5);
	City[j++] = new city("巴黎,法国", 48.8667, -2.667, -1);
	City[j++] = new city("圣保罗,巴西",-22.90,43.2333,3);
	City[j++] = new city("利雅得,沙特阿拉伯", 24.633, -46.71667, -3);
	City[j++] = new city("罗马,意大利",41.90, -12.4833,-1);
	City[j++] = new city("悉尼,澳大利亚",-33.8667,-151.2167,-10);
	City[j++] = new city("东京,日本", 35.70, -139.7667, -9); 
	City[j++] = new city("苏黎世,瑞士", 47.3833, -8.5333,-1);
	
	function setLatLong(f, index)
	{
		// Decimal degrees are passed in the array.  Temporarily store these 
		// degs in lat and lon deg and have convLatLong modify them.

		latDeg = City[index].lat;
		lonDegjs = City[index].lng;
	
		// These are needed to prevent iterative adding of min and sec when 
		// set button is clicked.

		latMinjs = 0;
		latSecjs = 0;
		lonMinjs = 0;
		lonSecjs = 0;
		
		//call convLatLong to convert decimal degrees into table form.

		convLatLong(f);

		//Local time zone value set in table

		shiqu =  City[index].zoneHr;
	}

	function isLeapYear(yr) 
	{
		return ((yr % 4 == 0 && yr % 100 != 0) || yr % 400 == 0);
	}

	function isPosInteger(inputVal) 
	{
		inputStr = ("" + inputVal);
		for (var i = 0; i < inputStr.length; i++) {
			var oneChar = inputStr.charAt(i);
			if (oneChar < "0" || oneChar > "9")
				return false;
		}
		return true;
	}
	
	function isInteger(inputVal) 
	{
		inputStr = "" + inputVal;
		if(inputStr == "NaN") return false;
		if(inputStr == "-NaN") return false;
		for (var i = 0; i < inputStr.length; i++) 
		{
			var oneChar = inputStr.charAt(i);
			if (i == 0 && (oneChar == "-" || oneChar == "+"))
			{
				continue;
			}
			if (oneChar < "0" || oneChar > "9")
			{
				return false;
			}
		}
		return true;
	}

	function isNumber(inputVal) 
	{
		var oneDecimal = false;
		var inputStr = "" + inputVal;
		for (var i = 0; i < inputStr.length; i++) 
		{
			var oneChar = inputStr.charAt(i);
			if (i == 0 && (oneChar == "-" || oneChar == "+"))
			{
				continue;
			}
			if (oneChar == "." && !oneDecimal) 
			{
				oneDecimal = true;
				continue;
			}
			if (oneChar < "0" || oneChar > "9")
			{
				return false;
			}
		}
		return true;
	}


	function isValidInput(f, index, latLongForm) 
	{
		if (dayjs == "") 
		{	//	see if the day field is empty
			alert("You must enter a day before attempting the calculation.");
			return false;
		}
		else if (yearjs == "") 
		{	//	 see if the year field is empty
			alert("You must enter a year before attempting the calculation.");
			return false;
		}
		else if (!isPosInteger(dayjs) || dayjs == 0)
		{
			alert("The day must be a positive integer.");
			return false;
		}
		else if (!isInteger(yearjs)) 
		{
			alert("The year must be an integer.");
			return false;
		}
		else if ( (yearjs < -1000) || (yearjs > 3000) )
		{
			alert("The algorithm used is not valid for years outside of/nthe range -1000 to 3000.");
			return false;
		}


		else if ((index != 1) && (dayjs > monthList[index].numdays)) 
		{
			alert("There are only " + monthList[index].numdays + " days in " 
				+ monthList[index].name + ".");
			return false;
		}

		else if (index == 1) 
		{	
			if (isLeapYear(yearjs)) {	//	year entered is a leap year
				if (dayjs > (monthList[index].numdays + 1)) 
				{
					alert("There are only " + (monthList[index].numdays + 1) 
						+ " days in " + monthList[index].name + ".");
					return false;
				}
				else
					return true;
			}
			else 
			{	//	year entered is not a leap year
				if (dayjs > monthList[index].numdays) 
				{
					alert("There are only " + monthList[index].numdays 
						+ " days in " + monthList[index].name + ".");
					return false;
				}
				else
					return true;
			}
		}
		else 
			return true;	
	}

	function convLatLong(f)
	{
		var neg = 0;
		if(latDeg[0] == '-') 
		{
			neg = 1;
		}

		if(neg != 1)
		{
			var latSeconds = (parseFloat(latDeg))*3600 
				+ parseFloat(latMinjs)*60 
				+ parseFloat(latSecjs)*1;

			latDeg = Math.floor(latSeconds/3600);
			latMinjs = Math.floor((latSeconds
				- (parseFloat(latDeg)*3600))/60);
			latSecjs = Math.floor((latSeconds
				- (parseFloat(latDeg)*3600) 
				- (parseFloat(latMinjs)*60)) + 0.5);
		}
		else if(parseFloat(latDeg) > -1)
		{
			var latSeconds = parseFloat(latDeg)*3600 
				- parseFloat(latMinjs)*60 
				- parseFloat(latSecjs)*1;

			latDeg = "-0";
			latMinjs = Math.floor((-latSeconds)/60);
			latSecjs = Math.floor( (-latSeconds 
				- (parseFloat(latMinjs)*60)) + 0.5);

		}
		else
		{
			var latSeconds = parseFloat(latDeg)*3600 
				- parseFloat(latMinjs)*60 
				- parseFloat(latSecjs)*1;

			latDeg = Math.ceil(latSeconds/3600);
			latMinjs = Math.floor((-latSeconds
				+ (parseFloat(latDeg)*3600))/60);
			latSecjs = Math.floor((-latSeconds
				+ (parseFloat(latDeg)*3600) 
				- (parseFloat(latMinjs)*60)) + 0.5);
		}

		neg = 0;
		if(lonDegjs[0] == '-') 
		{
			neg = 1;
		}

		if(neg != 1)
		{
			var lonSeconds = parseFloat(lonDegjs)*3600 
				+ parseFloat(lonMinjs)*60 
				+ parseFloat(lonSecjs)*1;
			lonDegjs = Math.floor(lonSeconds/3600);
			lonMinjs = Math.floor((lonSeconds
				- (parseFloat(lonDegjs)*3600))/60);
			lonSecjs = Math.floor((lonSeconds
				- (parseFloat(lonDegjs)*3600)
				- (parseFloat(lonMinjs))*60) + 0.5);
		}
		else if(parseFloat(lonDegjs) > -1)
		{
			var lonSeconds = parseFloat(lonDegjs)*3600 
				- parseFloat(lonMinjs)*60 
				- parseFloat(lonSecjs)*1;

			lonDegjs = "-0";
			lonMinjs = Math.floor((-lonSeconds)/60);
			lonSecjs = Math.floor((-lonSeconds
				- (parseFloat(lonMinjs)*60)) + 0.5);
		}
		else
		{
			var lonSeconds = parseFloat(lonDegjs)*3600 
				- parseFloat(lonMinjs)*60 
				- parseFloat(lonSecjs)*1;
			lonDegjs = Math.ceil(lonSeconds/3600);
			lonMinjs = Math.floor((-lonSeconds
				+ (parseFloat(lonDegjs)*3600))/60);
			lonSecjs = Math.floor((-lonSeconds
				+ (parseFloat(lonDegjs)*3600)
				- (parseFloat(lonMinjs)*60)) + 0.5);
		}

		if(latSeconds > 324000)
		{
			alert("You have entered an invalid latitude.\n  Setting lat= 89.8.");
			latDeg = 89.8;
			latMinjs = 0;
			latSecjs = 0;
		}
		if(latSeconds < -324000)
		{
			alert("You have entered an invalid latitude.\n  Setting lat= -89.8.");
			latDeg = -89.8;
			latMinjs = 0;
			latSecjs = 0;
		}
		if(lonSeconds > 648000)
		{
			alert("You have entered an invalid longitude.\n Setting lon= 180.");
			lonDegjs = 180;
			lonMinjs = 0;
			lonSecjs = 0;
		}
		if(lonSeconds < -648000)
		{
			alert("You have entered an invalid longitude.\n Setting lon= -180.");
			lonDegjs = -180;
			lonMinjs = 0;
			lonSecjs =0;
		}

	}


	function radToDeg(angleRad) 
	{
		return (180.0 * angleRad / Math.PI);
	}
	function degToRad(angleDeg) 
	{
		return (Math.PI * angleDeg / 180.0);
	}

	function calcDayOfYear(mn, dy, lpyr) 
	{
		var k = (lpyr ? 1 : 2);
		var doy = Math.floor((275 * mn)/9) - k * Math.floor((mn + 9)/12) + dy -30;
		return doy;
	}

	function calcDayOfWeek(juld)
	{
		var A = (juld + 1.5) % 7;
		var DOW = (A==0)?"Sunday":(A==1)?"Monday":(A==2)?"Tuesday":(A==3)?"Wednesday":(A==4)?"Thursday":(A==5)?"Friday":"Saturday";
		return DOW;
	}

	function calcJD(year, month, day)
	{
		if (month <= 2) {
			year -= 1;
			month += 12;
		}
		var A = Math.floor(year/100);
		var B = 2 - A + Math.floor(A/4);

		var JD = Math.floor(365.25*(year + 4716)) + Math.floor(30.6001*(month+1)) + day + B - 1524.5;
		return JD;
	}

	function calcDateFromJD(jd)
	{
		var z = Math.floor(jd + 0.5);
		var f = (jd + 0.5) - z;

		if (z < 2299161) {
			var A = z;
		} else {
			alpha = Math.floor((z - 1867216.25)/36524.25);
			var A = z + 1 + alpha - Math.floor(alpha/4);
		}

		var B = A + 1524;
		var C = Math.floor((B - 122.1)/365.25);
		var D = Math.floor(365.25 * C);
		var E = Math.floor((B - D)/30.6001);

		var day = B - D - Math.floor(30.6001 * E) + f;
		var month = (E < 14) ? E - 1 : E - 13;
		var year = (month > 2) ? C - 4716 : C - 4715;

		// alert ("date: " + day + "-" + monthList[month-1].name + "-" + year);
		return (day + "-" + monthList[month-1].name + "-" + year);
	}

	function calcDayFromJD(jd)
	{
		var z = Math.floor(jd + 0.5);
		var f = (jd + 0.5) - z;

		if (z < 2299161) {
			var A = z;
		} else {
			alpha = Math.floor((z - 1867216.25)/36524.25);
			var A = z + 1 + alpha - Math.floor(alpha/4);
		}

		var B = A + 1524;
		var C = Math.floor((B - 122.1)/365.25);
		var D = Math.floor(365.25 * C);
		var E = Math.floor((B - D)/30.6001);

		var day = B - D - Math.floor(30.6001 * E) + f;
		var month = (E < 14) ? E - 1 : E - 13;
		var year = (month > 2) ? C - 4716 : C - 4715;

		return ((day<10 ? "0" : "") + day + monthList[month-1].abbr);
	}


	function calcTimeJulianCent(jd)
	{
		var T = (jd - 2451545.0)/36525.0;
		return T;
	}

	function calcJDFromJulianCent(t)
	{
		var JD = t * 36525.0 + 2451545.0;
		return JD;
	}


	function calcGeomMeanLongSun(t)
	{
		var L0 = 280.46646 + t * (36000.76983 + 0.0003032 * t);
		while(L0 > 360.0)
		{
			L0 -= 360.0;
		}
		while(L0 < 0.0)
		{
			L0 += 360.0;
		}
		return L0;		// in degrees
	}

	function calcGeomMeanAnomalySun(t)
	{
		var M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
		return M;		// in degrees
	}

	function calcEccentricityEarthOrbit(t)
	{
		var e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
		return e;		// unitless
	}

	function calcSunEqOfCenter(t)
	{
		var m = calcGeomMeanAnomalySun(t);

		var mrad = degToRad(m);
		var sinm = Math.sin(mrad);
		var sin2m = Math.sin(mrad+mrad);
		var sin3m = Math.sin(mrad+mrad+mrad);

		var C = sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
		return C;		// in degrees
	}

	function calcSunTrueLong(t)
	{
		var l0 = calcGeomMeanLongSun(t);
		var c = calcSunEqOfCenter(t);

		var O = l0 + c;
		return O;		// in degrees
	}


	function calcSunTrueAnomaly(t)
	{
		var m = calcGeomMeanAnomalySun(t);
		var c = calcSunEqOfCenter(t);

		var v = m + c;
		return v;		// in degrees
	}


	function calcSunRadVector(t)
	{
		var v = calcSunTrueAnomaly(t);
		var e = calcEccentricityEarthOrbit(t);
 
		var R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(degToRad(v)));
		return R;		// in AUs
	}

	function calcSunApparentLong(t)
	{
		var o = calcSunTrueLong(t);

		var omega = 125.04 - 1934.136 * t;
		var lambda = o - 0.00569 - 0.00478 * Math.sin(degToRad(omega));
		return lambda;		// in degrees
	}

	function calcMeanObliquityOfEcliptic(t)
	{
		var seconds = 21.448 - t*(46.8150 + t*(0.00059 - t*(0.001813)));
		var e0 = 23.0 + (26.0 + (seconds/60.0))/60.0;
		return e0;		// in degrees
	}

	function calcObliquityCorrection(t)
	{
		var e0 = calcMeanObliquityOfEcliptic(t);

		var omega = 125.04 - 1934.136 * t;
		var e = e0 + 0.00256 * Math.cos(degToRad(omega));
		return e;		// in degrees
	}


	function calcSunRtAscension(t)
	{
		var e = calcObliquityCorrection(t);
		var lambda = calcSunApparentLong(t);
 
		var tananum = (Math.cos(degToRad(e)) * Math.sin(degToRad(lambda)));
		var tanadenom = (Math.cos(degToRad(lambda)));
		var alpha = radToDeg(Math.atan2(tananum, tanadenom));
		return alpha;		// in degrees
	}

	function calcSunDeclination(t)
	{
		var e = calcObliquityCorrection(t);
		var lambda = calcSunApparentLong(t);

		var sint = Math.sin(degToRad(e)) * Math.sin(degToRad(lambda));
		var theta = radToDeg(Math.asin(sint));
		return theta;		// in degrees
	}

	function calcEquationOfTime(t)
	{
		var epsilon = calcObliquityCorrection(t);
		var l0 = calcGeomMeanLongSun(t);
		var e = calcEccentricityEarthOrbit(t);
		var m = calcGeomMeanAnomalySun(t);

		var y = Math.tan(degToRad(epsilon)/2.0);
		y *= y;

		var sin2l0 = Math.sin(2.0 * degToRad(l0));
		var sinm   = Math.sin(degToRad(m));
		var cos2l0 = Math.cos(2.0 * degToRad(l0));
		var sin4l0 = Math.sin(4.0 * degToRad(l0));
		var sin2m  = Math.sin(2.0 * degToRad(m));

		var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0
				- 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;

		return radToDeg(Etime)*4.0;	// in minutes of time
	}

	function calcHourAngleSunrise(lat, solarDec)
	{
		var latRad = degToRad(lat);
		var sdRad  = degToRad(solarDec)

		var HAarg = (Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad));

		var HA = (Math.acos(Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad)));

		return HA;		// in radians
	}

	function calcHourAngleSunset(lat, solarDec)
	{
		var latRad = degToRad(lat);
		var sdRad  = degToRad(solarDec)

		var HAarg = (Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad));

		var HA = (Math.acos(Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad)));

		return -HA;		// in radians
	}


	function calcSunriseUTC(JD, latitude, longitude)
	{
		var t = calcTimeJulianCent(JD);

		// *** First pass to approximate sunrise

		var eqTime = calcEquationOfTime(t);
		var solarDec = calcSunDeclination(t);
		var hourAngle = calcHourAngleSunrise(latitude, solarDec);

		var delta = longitude - radToDeg(hourAngle);
		var timeDiff = 4 * delta;	// in minutes of time
		var timeUTC = 720 + timeDiff - eqTime;	// in minutes

		// alert("eqTime = " + eqTime + "\nsolarDec = " + solarDec + "\ntimeUTC = " + timeUTC);

		// *** Second pass includes fractional jday in gamma calc

		var newt = calcTimeJulianCent(calcJDFromJulianCent(t) + timeUTC/1440.0); 
		eqTime = calcEquationOfTime(newt);
		solarDec = calcSunDeclination(newt);
		hourAngle = calcHourAngleSunrise(latitude, solarDec);
		delta = longitude - radToDeg(hourAngle);
		timeDiff = 4 * delta;
		timeUTC = 720 + timeDiff - eqTime; // in minutes

		// alert("eqTime = " + eqTime + "\nsolarDec = " + solarDec + "\ntimeUTC = " + timeUTC);

		return timeUTC;
	}

	function calcSolNoonUTC(t, longitude)
	{
		var newt = calcTimeJulianCent(calcJDFromJulianCent(t) + 0.5 + longitude/360.0); 

		var eqTime = calcEquationOfTime(t);
		var solarNoonDec = calcSunDeclination(t);
		var solNoonUTC = 720 + (longitude * 4) - eqTime; // min
		
		return solNoonUTC;
	}

	function calcSunsetUTC(JD, latitude, longitude)
	{
		var t = calcTimeJulianCent(JD);

		// First calculates sunrise and approx length of day

		var eqTime = calcEquationOfTime(t);
		var solarDec = calcSunDeclination(t);
		var hourAngle = calcHourAngleSunset(latitude, solarDec);

		var delta = longitude - radToDeg(hourAngle);
		var timeDiff = 4 * delta;
		var timeUTC = 720 + timeDiff - eqTime;

		// first pass used to include fractional day in gamma calc

		var newt = calcTimeJulianCent(calcJDFromJulianCent(t) + timeUTC/1440.0); 
		eqTime = calcEquationOfTime(newt);
		solarDec = calcSunDeclination(newt);
		hourAngle = calcHourAngleSunset(latitude, solarDec);

		delta = longitude - radToDeg(hourAngle);
		timeDiff = 4 * delta;
		timeUTC = 720 + timeDiff - eqTime; // in minutes

		return timeUTC;
	}


	function getLatitude(latLongForm)
	{
		var neg = 0;
		var degs = parseFloat(latDegjs);
		if (latDegjs[0] == '-') 
		{
			neg = 1;
		}

		var mins = parseFloat(latMinjs);

		var secs = parseFloat(latSecjs);

		if(neg != 1)
		{
			var decLat = degs + (mins / 60) + (secs / 3600);
		} 
		else if(neg == 1)
		{
			var decLat = degs - (mins / 60) - (secs / 3600);
		} else 
		{
			return -9999;
		}
		return decLat;
	}	


	function getLongitude(latLongForm)
	{
		var neg = 0;
		var degs = parseFloat(lonDegjs);
		if (lonDegjs[0] == '-') 
		{
			neg = 1;
		}
		var mins = parseFloat(lonMinjs);
		var secs = parseFloat(lonSecjs);
		var decLon = degs + (mins / 60) + (secs / 3600);

		if(neg != 1)
		{
			var decLon = degs + (mins / 60) + (secs / 3600);
		} else if(neg == 1)
		{
			var decLon = degs - (mins / 60) - (secs / 3600);
		} else 
		{
			return -9999;
		}
		return decLon;
	}	


	function findRecentSunrise(jd, latitude, longitude)
	{
		var julianday = jd;

		var time = calcSunriseUTC(julianday, latitude, longitude);
		while(!isNumber(time)){
			julianday -= 1.0;
			time = calcSunriseUTC(julianday, latitude, longitude);
		}

		return julianday;
	}


	function findRecentSunset(jd, latitude, longitude)
	{
		var julianday = jd;

		var time = calcSunsetUTC(julianday, latitude, longitude);
		while(!isNumber(time)){
			julianday -= 1.0;
			time = calcSunsetUTC(julianday, latitude, longitude);
		}

		return julianday;
	}

	function findNextSunrise(jd, latitude, longitude)
	{
		var julianday = jd;

		var time = calcSunriseUTC(julianday, latitude, longitude);
		while(!isNumber(time)){
			julianday += 1.0;
			time = calcSunriseUTC(julianday, latitude, longitude);
		}

		return julianday;
	}

	function findNextSunset(jd, latitude, longitude)
	{
		var julianday = jd;

		var time = calcSunsetUTC(julianday, latitude, longitude);
		while(!isNumber(time)){
			julianday += 1.0;
			time = calcSunsetUTC(julianday, latitude, longitude);
		}

		return julianday;
	}

	function timeString(minutes)

	{
		var floatHour = minutes / 60;
		var hour = Math.floor(floatHour);
		var floatMinute = 60 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec);

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute + ":";
		else
			timeStr += minute + ":";
		if (second < 10)	//	i.e. only one digit
			timeStr += "0" + second;
		else
			timeStr += second;

		return timeStr;
	}

	function timeStringShortAMPM(minutes, JD)
	{
		var julianday = JD;
		var floatHour = minutes / 60;
		var hour = Math.floor(floatHour);
		var floatMinute = 60 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec);
		var PM = false;

		minute += (second >= 30)? 1 : 0;

		if (minute >= 60) 
		{
			minute -= 60;
			hour ++;
		}

		var daychange = false;
		if (hour > 23) 
		{
			hour -= 24;
			daychange = true;
			julianday += 1.0;
		}

		if (hour < 0)
		{
			hour += 24;
			daychange = true;
			julianday -= 1.0;
		}

		if (hour > 11)
		{
			hour -= 12;
			PM = true;
		}

		if (hour == 0)
		{
			PM = false;
			hour = 12;
		}

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute + ((PM)?"PM":"AM");
		else
			timeStr += "" + minute + ((PM)?"PM":"AM");

		if (daychange) return timeStr + " " + calcDayFromJD(julianday);
		return timeStr;
	}


	function timeStringAMPMDate(minutes, JD)
	{
		var julianday = JD;
		var floatHour = minutes / 60;
		var hour = Math.floor(floatHour);
		var floatMinute = 60 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec);

		minute += (second >= 30)? 1 : 0;

		if (minute >= 60) 
		{
			minute -= 60;
			hour ++;
		}

		if (hour > 23) 
		{
			hour -= 24;
			julianday += 1.0;
		}

		if (hour < 0)
		{
			hour += 24;
			julianday -= 1.0;
		}

		var PM = false;
		if (hour > 11)
		{
			hour -= 12;
			PM = true;
		}

		if (hour == 0)
		{
			PM = false;
			hour = 12;
		}

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute + ((PM)?"PM":"AM");
		else
			timeStr += minute + ((PM)?"PM":"AM");

		return timeStr + " " + calcDayFromJD(julianday);
	}

	function timeStringDate(minutes, JD)
	{
		var julianday = JD;
		var floatHour = minutes / 60;
		var hour = Math.floor(floatHour);
		var floatMinute = 60 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec);

		minute += (second >= 30)? 1 : 0;

		if (minute >= 60) 
		{
			minute -= 60;
			hour ++;
		}

		var daychange = false;
		if (hour > 23) 
		{
			hour -= 24;
			julianday += 1.0;
			daychange = true;
		}

		if (hour < 0)
		{
			hour += 24;
			julianday -= 1.0;
			daychange = true;
		}

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute;
		else
			timeStr += minute;

		if (daychange) return timeStr + " " + calcDayFromJD(julianday);
		return timeStr;
	}


	function calcSun(riseSetForm, latLongForm, index, index2) 
	{
		if(index2 != 0)
		{
			setLatLong(latLongForm, index2);
		}

		var latitude = getLatitude(latLongForm);
		var longitude = getLongitude(latLongForm);
		var indexRS = riseSetForm_mos_selectedIndex;
		if (isValidInput(riseSetForm, indexRS, latLongForm)) 
		{
			if((latitude >= -90) && (latitude < -89.8))
			{
				alert("All latitudes between 89.8 and 90 S\n will be set to -89.8");
				latDegjs = -89.8;
				latitude = -89.8;
			}
			if ((latitude <= 90) && (latitude > 89.8))
			{
				alert("All latitudes between 89.8 and 90 N\n will be set to 89.8");
				latDegjs = 89.8;
				latitude = 89.8;
			}
			var JD = (calcJD(parseFloat(yearjs), indexRS + 1, parseFloat(dayjs)));
			var dow = calcDayOfWeek(JD);
			var doy = calcDayOfYear(indexRS + 1, parseFloat(dayjs), isLeapYear(yearjs));
			var T = calcTimeJulianCent(JD);
			var alpha = calcSunRtAscension(T);
			var theta = calcSunDeclination(T);
			var Etime = calcEquationOfTime(T);

			var eqTime = Etime;
			var solarDec = theta;

			eqTimejs = (Math.floor(100*eqTime))/100;
			solarDecjs = (Math.floor(100*(solarDec)))/100;

			var nosunrise = false;

			var riseTimeGMT = calcSunriseUTC(JD, latitude, longitude);
			if (!isNumber(riseTimeGMT))
			{
				nosunrise = true;
			}

			var nosunset = false;
			var setTimeGMT = calcSunsetUTC(JD, latitude, longitude);
			if (!isNumber(setTimeGMT))
			{
				nosunset = true;
			}

			var daySavings = YesNo[index].value;  // = 0 (no) or 60 (yes)
			var zone = shiqu;
			if(zone > 12 || zone < -12.5)
			{
				alert("The offset must be between -12.5 and 12.  \n Setting \"Off-Set\"=0");
				zone = "0";
				shiqu = zone;
			}

			if (!nosunrise)		// Sunrise was found
			{
				var riseTimeLST = riseTimeGMT - (60 * zone) + daySavings;	
					//	in minutes
				var riseStr = timeStringShortAMPM(riseTimeLST, JD);
				var utcRiseStr = timeStringDate(riseTimeGMT, JD);
				sunrisejsD=riseStr;
				var s1 = sunrisejsD[1]==":"?"0"+sunrisejsD.substring(0, 4):sunrisejsD.substring(0, 5);
				js_sunrisejs_J(s1);
				utcsunrisejs = utcRiseStr;
			}

			if (!nosunset)		// Sunset was found
			{
				var setTimeLST = setTimeGMT - (60 * zone) + daySavings;
				var setStr = timeStringShortAMPM(setTimeLST, JD);
				var utcSetStr = timeStringDate(setTimeGMT, JD);

				sunsetjsd = setStr;
				if(setStr.indexOf("PM")>0){
					if(setStr.indexOf(":")==1){
						var ajs=parseInt(setStr.substring(0, 1));
						ajs+=12;
						sunsetjsd=ajs+setStr.substring(1, 4);
					}else{
						var ajs=parseInt(setStr.substring(0, 2));
						ajs+=12;
						sunsetjsd=ajs+setStr.substring(1, 4);
					}
				}
				js_sunsetjs_J(sunsetjsd);
//				riseSetForm["utcsunset"].value = utcSetStr;
			}

	
			var solNoonGMT = calcSolNoonUTC(T, longitude);
			var solNoonLST = solNoonGMT - (60 * zone) + daySavings;

			var solnStr = timeString(solNoonLST);
			var utcSolnStr = timeString(solNoonGMT);

			solnoonjs = solnStr;
			utcsolnoonjs = utcSolnStr;
			convLatLong(latLongForm);

	
			if(nosunrise)
			{ 
				utcsunrisejs = "";
				if ( ((latitude > 66.4) && (doy > 79) && (doy < 267)) ||
				   ((latitude < -66.4) && ((doy < 83) || (doy > 263))) )
				{
					newjd = findRecentSunrise(JD, latitude, longitude);
					newtime = calcSunriseUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440;
						newjd -= 1.0;
					}
					sunrisejsD = 
						timeStringAMPMDate(newtime, newjd);
					utcsunrisejs = "prior sunrise";
				}

				else if ( ((latitude > 66.4) && ((doy < 83) || (doy > 263))) ||
					((latitude < -66.4) && (doy > 79) && (doy < 267)) )
				{
					newjd = findNextSunrise(JD, latitude, longitude);
					newtime = calcSunriseUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440;
						newjd -= 1.0;
					}
					sunrisejsD = 
						timeStringAMPMDate(newtime, newjd);
					utcsunrisejs = "next sunrise";
				}
				else 
				{
					alert("Cannot Find Sunrise!");
				}

			}

			if(nosunset)
			{ 
//				riseSetForm["utcsunset"].value = "";

				if ( ((latitude > 66.4) && (doy > 79) && (doy < 267)) ||
				   ((latitude < -66.4) && ((doy < 83) || (doy > 263))) )
				{
					newjd = findNextSunset(JD, latitude, longitude);
					newtime = calcSunsetUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440;
						newjd -= 1.0;
					}
					sunsetjsd = 
						timeStringAMPMDate(newtime, newjd);
					if(setStr.indexOf("PM")>0){
						if(setStr.indexOf(":")==1){
							var ajs=parseInt(setStr.substring(0, 1));
							ajs+=12;
							sunsetjsd=ajs+setStr.substring(1, 4);
						}else{
							var ajs=parseInt(setStr.substring(0, 2));
							ajs+=12;
							sunsetjsd=ajs+setStr.substring(1, 4);
						}
					}
					js_sunsetjs_J(sunsetjsd);
//					riseSetForm["utcsunset"].value = "next sunset";
					utcsolnoonjs = "";
				}

				else if ( ((latitude > 66.4) && ((doy < 83) || (doy > 263))) ||
					((latitude < -66.4) && (doy > 79) && (doy < 267)) )
				{
					newjd = findRecentSunset(JD, latitude, longitude);
					newtime = calcSunsetUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440;
						newjd -= 1.0;
					}
					sunsetjsd = 
						timeStringAMPMDate(newtime, newjd);
					if(setStr.indexOf("PM")>0){
						if(setStr.indexOf(":")==1){
							var ajs=parseInt(setStr.substring(0, 1));
							ajs+=12;
							sunsetjsd=ajs+setStr.substring(1, 4);
						}else{
							var ajs=parseInt(setStr.substring(0, 2));
							ajs+=12;
							sunsetjsd=ajs+setStr.substring(1, 4);
						}
					}
					js_sunsetjs_J(sunsetjsd);
//					riseSetForm["utcsunset"].value = "prior sunset";
					solnoonjs = "N/A";
					utcsolnoonjs = "";
				}

				else 
				{
					alert ("Cannot Find Sunset!");
				}
			}
		}
	}


