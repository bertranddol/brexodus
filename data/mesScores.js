
// English Speaking
// Football
// Crime
// Weather
// Income
// Healthcare
// Unesco Monument
// Single
// Humour
// Education
// Science
// Number of Island
// Diversity
// Colonial Past
// Right Wing
// Xenophobia
// Robbery per capita: http://www.theglobaleconomy.com/rankings/robery/
// Migrant source: https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population -  UN report Trends in International Migrant Stock: The 2015 Revision
// Rainfall: https://www.currentresults.com/Weather/Europe/Cities/precipitation-annual-average.php
// English Speaking: https://en.wikipedia.org/wiki/List_of_countries_by_English-speaking_population
// Unemployment rate: https://en.wikipedia.org/wiki/List_of_countries_by_unemployment_rate
var pays = [];
var choixArr = [];
var pays = {
    mesScores: 
	    [
{name: "United Kingdom"	,climat: 3,migrant: 12,rainfall:981,english:  98,chomage: 9.1,robbery:500 ,finance: 6,unesco:10},
{name: "Austria"		,climat: 5,migrant: 15,rainfall:651,english: 73,chomage: 9.1,robbery:51 ,finance: 7,unesco: 2},
{name: "Belgium"		,climat: 5,migrant: 13,rainfall:852,english:  59,chomage: 8.5,robbery:1693 ,finance: 6,unesco: 8},
{name: "Bulgaria"		,climat: 7,migrant: 1,rainfall:579,english:  25,chomage: 9.9,robbery:50 ,finance: 7,unesco: 5},
{name: "Croatia"		,climat: 7,migrant: 18,rainfall:840,english:  49,chomage: 17.2,robbery:28 ,finance: 7,unesco: 5},
{name: "Cyprus"			,climat: 10,migrant: 18,rainfall:365,english:  73,chomage: 12.1,robbery:14 ,finance: 7,unesco: 5},
{name: "Czech"			,climat: 6,migrant: 4,rainfall:526,english:  27,chomage: 6.1,robbery:38 ,finance: 7,unesco: 5},
{name: "Denmark"   	    ,climat: 4,migrant: 9,rainfall:523,english:  86,chomage: 5.8,robbery:60 ,finance: 6,unesco:10},
{name: "Estonia"   	    ,climat: 2,migrant: 8,rainfall:693,english:  50,chomage: 6.3,robbery:46 ,finance: 6,unesco:10},
{name: "Finland"		,climat: 1,migrant: 5,rainfall:682,english:  70,chomage: 10.1,robbery:28 ,finance: 7,unesco: 5},
{name: "France"			,climat: 8,migrant: 11,rainfall:637,english:  39,chomage: 10.3,robbery:191 ,finance: 6,unesco:10},
{name: "Germany"		,climat: 6,migrant: 11,rainfall:571,english:  64,chomage: 4.5,robbery:58 ,finance:10,unesco: 7},
{name: "Greece"			,climat:10,migrant: 11,rainfall:365,english: 51,chomage: 24.1,robbery:54 ,finance: 7,unesco: 2},
{name: "Hungary"  	    ,climat: 7,migrant: 5,rainfall:758,english:  20,chomage: 6.0,robbery:33 ,finance: 6,unesco:10},
{name: "Ireland"		,climat: 2,migrant: 16,rainfall:758,english: 98,chomage: 7.8,robbery:71 ,finance: 7,unesco: 2},
{name: "Italy"			,climat:10,migrant: 8,rainfall:799,english:  34,chomage: 11.4,robbery:79 ,finance: 5,unesco:10},
{name: "Latvia"			,climat: 2,migrant: 14,rainfall:636,english: 46,chomage: 9.8,robbery:51 ,finance: 7,unesco: 2},
{name: "Lithuania"		,climat: 2,migrant: 5,rainfall:683,english: 38,chomage: 9.2,robbery:89 ,finance: 7,unesco: 2},
{name: "Luxembourg"		,climat: 8,migrant: 43,rainfall:878,english: 56,chomage: 6.5,robbery:74 ,finance: 7,unesco: 2},
{name: "Malta"			,climat: 9,migrant: 8,rainfall:553,english:  89,chomage: 5.2,robbery:46 ,finance:10,unesco: 7},
{name: "Netherlands"	,climat: 6,migrant: 11,rainfall:838,english:  90,chomage: 6.4,robbery:96 ,finance: 6,unesco: 8},
{name: "Poland"   	    ,climat: 5,migrant: 8,rainfall:515,english:  37,chomage: 9.5,robbery:50 ,finance: 6,unesco:10},
{name: "Portugal"		,climat:10,migrant: 7,rainfall:726,english:  27,chomage: 12.2,robbery:193 ,finance: 4,unesco: 8},
{name: "Romania"		,climat: 8,migrant: 1,rainfall:595,english:  31,chomage: 6.4,robbery:11 ,finance: 7,unesco: 5},
{name: "Slovakia"		,climat: 7,migrant: 3,rainfall:557,english:  26,chomage: 9.9,robbery:21 ,finance: 7,unesco: 5},
{name: "Slovenia"		,climat: 9,migrant: 11,rainfall:1368,english:  59,chomage: 12.6,robbery:22 ,finance: 7,unesco: 5},
{name: "Spain"			,climat:10,migrant: 14,rainfall:436,english:  22,chomage: 21.4,robbery:1143 ,finance: 4,unesco: 8},
{name: "Norway"   	    ,climat: 2,migrant: 14,rainfall:763,english:  90,chomage: 4.6,robbery:34 ,finance: 6,unesco:10},
{name: "Sweden"   	    ,climat: 2,migrant: 14,rainfall:539,english:  86,chomage: 7.7,robbery:98 ,finance: 6,unesco:10},
]
}