import R from 'ramda';
import { allRaces, allIntensities } from './constants';
import { timeToSec, secToTime } from './conversion';


const raceTimes = [];
const VDOT_MIN = 30;
const VDOT_MAX = 85;

// ["1500", "Mile", "3k", "2-mile", "5k", "8k", "5-mile", "10k", "15k", "10-mile", "20k", "1/2 Marathon", "25k", "30k", "Marathon"];
raceTimes[85] = ["3:23.5", "3:39.6", "7:14.1", "7:48.9", "12:37", "20:50", "20:58", "26:19", "40:17", "43:26", "54:40", "57:50", "1:09:33", "1:24:33", "2:01:10"];
raceTimes[84] = ["3:25.5", "3:41.8", "7:18.5", "7:53.7", "12:45", "21:02", "21:10", "26:34", "40:42", "43:53", "55:14", "58:25", "1:10:15", "1:25:25", "2:02:24"];
raceTimes[83] = ["3:27.6", "3:44.1", "7:23.1", "7:58.7", "12:53", "21:16", "21:24", "26:51", "41:06", "44:19", "55:48", "59:01", "1:10:59", "1:26:18", "2:03:40"];
raceTimes[82] = ["3:29.7", "3:46.4", "7:27.8", "8:03.7", "13:01", "21:29", "21:37", "27:07", "41:32", "44:47", "56:23", "59:38", "1:11:43", "1:27:12", "2:04:57"];
raceTimes[81] = ["3:31.9", "3:48.7", "7:32.5", "8:08.9", "13:09", "21:42", "21:50", "27:24", "41:58", "45:15", "56:58", "1:00:15", "1:12:28", "1:28:07", "2:06:17"];
raceTimes[80] = ["3:34.2", "3:51.2", "7:37.5", "8:14.2", "13:18", "21:56", "22:04", "27:41", "42:25", "45:44", "57:34", "1:00:54", "1:13:15", "1:29:04", "2:07:38"];
raceTimes[79] = ["3:36.5", "3:53.7", "7:43", "8:20", "13:26", "22:10", "22:18", "27:59", "42:52", "46:13", "58:12", "1:01:34", "1:14:03", "1:30:02", "2:09:02"];
raceTimes[78] = ["3:38.8", "3:56.2", "7:48", "8:25", "13:35", "22:24", "22:32", "28:17", "43:20", "46:44", "58:51", "1:02:15", "1:14:52", "1:31:02", "2:10:27"];
raceTimes[77] = ["3:41", "3:58", "7:53", "8:31", "13:44", "22:39", "22:48", "28:36", "43:49", "47:15", "59:30", "1:02:56", "1:15:41", "1:32:02", "2:11:54"];
raceTimes[76] = ["3:44", "4:02", "7:58", "8:37", "13:54", "22:55", "23:03", "28:55", "44:18", "47:46", "1:00:10", "1:03:39", "1:16:33", "1:33:05", "2:13:23"];
raceTimes[75] = ["3:46", "4:04", "8:04", "8:43", "14:03", "23:10", "23:18", "29:14", "44:48", "48:19", "1:00:52", "1:04:23", "1:17:26", "1:34:09", "2:14:55"];
raceTimes[74] = ["3:49", "4:07", "8:10", "8:49", "14:13", "23:26", "23:34", "29:34", "45:19", "48:52", "1:01:34", "1:05:08", "1:18:20", "1:35:14", "2:16:29"];
raceTimes[73] = ["3:52", "4:10", "8:16", "8:55", "14:23", "23:42", "23:51", "29:55", "45:51", "49:27", "1:02:17", "1:05:54", "1:19:15", "1:36:22", "2:18:05"];
raceTimes[72] = ["3:54", "4:13", "8:22", "9:02", "14:33", "23:59", "24:08", "30:16", "46:24", "50:02", "1:03:03", "1:06:42", "1:20:13", "1:37:31", "2:19:44"];
raceTimes[71] = ["3:57", "4:16", "8:28", "9:09", "14:44", "24:16", "24:25", "30:38", "46:58", "50:39", "1:03:49", "1:07:31", "1:21:11", "1:38:42", "2:21:26"];
raceTimes[70] = ["4:00", "4:19", "8:34", "9:16", "14:55", "24:34", "24:43", "31:00", "47:32", "51:16", "1:04:36", "1:08:21", "1:22:11", "1:39:55", "2:23:10"];
raceTimes[69] = ["4:03", "4:23", "8:41", "9:23", "15:06", "24:52", "25:01", "31:23", "48:08", "51:55", "1:05:24", "1:09:12", "1:23:13", "1:41:10", "2:24:57"];
raceTimes[68] = ["4:06", "4:26", "8:48", "9:30", "15:18", "25:11", "25:20", "31:46", "48:44", "52:34", "1:06:14", "1:10:05", "1:24:16", "1:42:27", "2:26:47"];
raceTimes[67] = ["4:10", "4:30", "8:55", "9:37", "15:29", "25:30", "25:40", "32:11", "49:22", "53:15", "1:07:06", "1:11:00", "1:25:22", "1:43:46", "2:28:40"];
raceTimes[66] = ["4:13", "4:33", "9:02", "9:45", "15:42", "25:50", "25:59", "32:35", "50:00", "53:56", "1:07:59", "1:11:56", "1:26:29", "1:45:08", "2:30:36"];
raceTimes[65] = ["4:16", "4:37", "9:09", "9:53", "15:54", "26:10", "26:20", "33:01", "50:40", "54:39", "1:08:53", "1:12:53", "1:27:38", "1:46:31", "2:32:35"];
raceTimes[64] = ["4:20", "4:41", "9:17", "10:01", "16:07", "26:32", "26:41", "33:28", "51:21", "55:23", "1:09:50", "1:13:53", "1:28:49", "1:47:57", "2:34:38"];
raceTimes[63] = ["4:24", "4:45", "9:25", "10:10", "16:20", "26:53", "27:03", "33:55", "52:03", "56:09", "1:10:47", "1:14:54", "1:30:02", "1:49:26", "2:36:44"];
raceTimes[62] = ["4:27", "4:49", "9:33", "10:18", "16:34", "27:15", "27:25", "34:23", "52:47", "56:56", "1:11:47", "1:15:57", "1:31:18", "1:50:57", "2:38:54"];
raceTimes[61] = ["4:31", "4:53", "9:41", "10:27", "16:48", "27:38", "27:49", "34:52", "53:32", "57:45", "1:12:48", "1:17:02", "1:32:35", "1:52:31", "2:41:08"];
raceTimes[60] = ["4:35", "4:57", "9:50", "10:37", "17:03", "28:02", "28:13", "35:22", "54:18", "58:35", "1:13:51", "1:18:09", "1:33:55", "1:54:08", "2:43:25"];
raceTimes[59] = ["4:39", "5:02", "9:58", "10:46", "17:17", "28:26", "28:36", "35:52", "55:06", "59:26", "1:14:57", "1:19:18", "1:35:18", "1:55:48", "2:45:47"];
raceTimes[58] = ["4:44", "5:06", "10:08", "10:56", "17:33", "28:52", "29:02", "36:24", "55:55", "1:00:20", "1:16:05", "1:20:30", "1:36:44", "1:57:31", "2:48:14"];
raceTimes[57] = ["4:48", "5:11", "10:17", "11:06", "17:49", "29:18", "29:29", "36:57", "56:46", "1:01:14", "1:17:14", "1:21:43", "1:38:11", "1:59:17", "2:50:45"];
raceTimes[56] = ["4:53", "5:16", "10:27", "11:17", "18:05", "29:45", "29:55", "37:31", "57:39", "1:02:12", "1:18:26", "1:23:00", "1:39:43", "2:01:07", "2:53:20"];
raceTimes[55] = ["4:57", "5:21", "10:37", "11:28", "18:22", "30:12", "30:23", "38:06", "58:33", "1:03:10", "1:19:40", "1:24:18", "1:41:16", "2:03:00", "2:56:01"];
raceTimes[54] = ["5:02", "5:27", "10:47", "11:39", "18:40", "30:41", "30:52", "38:42", "59:30", "1:04:12", "1:20:57", "1:25:40", "1:42:53", "2:04:58", "2:58:47"];
raceTimes[53] = ["5:07", "5:32", "10:58", "11:50", "18:58", "31:11", "31:23", "39:20", "1:00:28", "1:05:14", "1:22:17", "1:27:04", "1:44:34", "2:06:59", "3:01:39"];
raceTimes[52] = ["5:13", "5:38", "11:09", "12:02", "19:17", "31:42", "31:54", "39:59", "1:01:29", "1:06:20", "1:23:39", "1:28:31", "1:46:17", "2:09:04", "3:04:36"];
raceTimes[51] = ["5:18", "5:44", "11:21", "12:15", "19:36", "32:14", "32:26", "40:39", "1:02:31", "1:07:27", "1:25:05", "1:30:02", "1:48:05", "2:11:13", "3:07:39"];
raceTimes[50] = ["5:24", "5:50", "11:33", "12:28", "19:57", "32:47", "32:59", "41:21", "1:03:36", "1:08:37", "1:26:33", "1:31:35", "1:49:56", "2:13:27", "3:10:49"];
raceTimes[49] = ["5:30", "5:56", "11:45", "12:41", "20:18", "33:22", "33:34", "42:04", "1:04:44", "1:09:50", "1:28:05", "1:33:12", "1:51:52", "2:15:47", "3:14:06"];
raceTimes[48] = ["5:36", "6:03", "11:58", "12:55", "20:39", "33:58", "34:10", "42:50", "1:05:53", "1:11:05", "1:29:40", "1:34:53", "1:53:52", "2:18:11", "3:17:29"];
raceTimes[47] = ["5:42", "6:10", "12:12", "13:10", "21:02", "34:34", "34:47", "43:36", "1:07:06", "1:12:24", "1:31:19", "1:36:38", "1:55:56", "2:20:40", "3:21:00"];
raceTimes[46] = ["5:49", "6:17", "12:26", "13:25", "21:25", "35:13", "35:26", "44:25", "1:08:22", "1:13:46", "1:33:02", "1:38:27", "1:58:06", "2:23:16", "3:24:39"];
raceTimes[45] = ["5:56", "6:25", "12:40", "13:40", "21:50", "35:54", "36:07", "45:16", "1:09:40", "1:15:10", "1:34:49", "1:40:20", "2:00:20", "2:25:57", "3:28:26"];
raceTimes[44] = ["6:03", "6:32", "12:55", "13:56", "22:15", "36:35", "36:49", "46:09", "1:11:02", "1:16:38", "1:36:40", "1:42:17", "2:02:39", "2:28:45", "3:32:23"];
raceTimes[43] = ["6:11", "6:41", "13:11", "14:13", "22:41", "37:19", "37:32", "47:04", "1:12:27", "1:18:10", "1:38:36", "1:44:20", "2:05:05", "2:31:39", "3:36:28"];
raceTimes[42] = ["6:19", "6:49", "13:28", "14:31", "23:09", "38:04", "38:18", "48:01", "1:13:56", "1:19:46", "1:40:36", "1:46:27", "2:07:35", "2:34:40", "3:40:43"];
raceTimes[41] = ["6:27", "6:58", "13:45", "14:49", "23:38", "38:52", "39:06", "49:01", "1:15:29", "1:21:26", "1:42:42", "1:48:40", "2:10:13", "2:37:49", "3:45:09"];
raceTimes[40] = ["6:35", "7:07", "14:03", "15:08", "24:08", "39:41", "39:56", "50:03", "1:17:06", "1:23:11", "1:44:53", "1:50:59", "2:12:57", "2:41:06", "3:49:45"];
raceTimes[39] = ["6:44", "7:17", "14:21", "15:29", "24:39", "40:33", "40:48", "51:09", "1:18:47", "1:24:59", "1:47:10", "1:53:24", "2:15:49", "2:44:32", "3:54:34"];
raceTimes[38] = ["6:54", "7:27", "14:41", "15:49", "25:12", "41:27", "41:42", "52:17", "1:20:33", "1:26:54", "1:49:33", "1:55:55", "2:18:48", "2:48:06", "3:59:35"];
raceTimes[37] = ["7:04", "7:38", "15:01", "16:11", "25:46", "42:24", "42:39", "53:29", "1:22:24", "1:28:53", "1:52:03", "1:58:34", "2:21:55", "2:51:51", "4:04:50"];
raceTimes[36] = ["7:14", "7:49", "15:23", "16:34", "26:22", "43:23", "43:39", "54:44", "1:24:20", "1:30:58", "1:54:40", "2:01:19", "2:25:11", "2:55:45", "4:10:19"];
raceTimes[35] = ["7:25", "8:01", "15:45", "16:58", "27:00", "44:26", "44:42", "56:03", "1:26:22", "1:33:09", "1:57:24", "2:04:13", "2:28:36", "2:59:51", "4:16:03"];
raceTimes[34] = ["7:37", "8:14", "16:09", "17:24", "27:39", "45:31", "45:48", "57:26", "1:28:30", "1:35:27", "2:00:17", "2:07:16", "2:32:12", "3:04:08", "4:22:03"];
raceTimes[33] = ["7:49", "8:27", "16:33", "17:50", "28:21", "46:41", "46:58", "58:54", "1:30:45", "1:37:52", "2:03:18", "2:10:27", "2:35:58", "3:08:39", "4:28:22"];
raceTimes[32] = ["8:02", "8:41", "16:59", "18:18", "29:05", "47:54", "48:11", "1:00:26", "1:33:07", "1:40:25", "2:06:29", "2:13:49", "2:39:56", "3:13:23", "4:34:59"];
raceTimes[31] = ["8:15", "8:55", "17:27", "18:48", "29:51", "49:10", "49:28", "1:02:03", "1:35:36", "1:43:05", "2:09:50", "2:17:21", "2:44:06", "3:18:22", "4:41:57"];
raceTimes[30] = ["8:30", "9:11", "17:56", "19:19", "30:40", "50:32", "50:50", "1:03:46", "1:38:14", "1:45:55", "2:13:21", "2:21:04", "2:48:29", "3:23:37", "4:49:17"];

const intensity = [];
//["E/L Pace km", "E/L Pace mile", "MP mile", "T Pace 400", "T Pace 800", "T Pace 1000", "T Pace .68 mile", "T Pace mile", "I Pace 400", "I Pace 1000", "I Pace .68 mile", "I Pace 1200", "I Pace mile", "R Pace 200", "R Pace 400", "R Pace 800"];
intensity[30] = ["7:52", "12:40", "11:01", "02:33", "05:07", "06:24", "07:00", "10:18", "02:22", "0", "0", "0", "0", "67", "2:16", "0"];
intensity[31] = ["7:41", "12:22", "10:45", "02:30", "04:59", "06:14", "06:49", "10:02", "02:18", "0", "0", "0", "0", "65", "2:12", "0"];
intensity[32] = ["7:30", "12:04", "10:29", "02:26", "04:52", "06:05", "06:39", "09:47", "02:14", "0", "0", "0", "0", "63", "2:08", "0"];
intensity[33] = ["7:20", "11:48", "10:14", "02:23", "04:45", "05:56", "06:30", "09:33", "02:11", "0", "0", "0", "0", "62", "2:05", "0"];
intensity[34] = ["7:10", "11:32", "10:00", "02:19", "04:38", "05:48", "06:21", "09:20", "02:08", "0", "0", "0", "0", "60", "2:02", "0"];
intensity[35] = ["7:01", "11:17", "9:46", "02:16", "04:32", "05:40", "06:12", "09:07", "02:05", "0", "0", "0", "0", "59", "1:59", "0"];
intensity[36] = ["6:52", "11:02", "9:33", "02:13", "04:26", "05:33", "06:04", "08:55", "02:02", "0", "0", "0", "0", "57", "1:55", "0"];
intensity[37] = ["6:43", "10:49", "9:20", "02:10", "04:20", "05:25", "05:56", "08:44", "01:59", "05:00", "0", "0", "0", "56", "1:53", "0"];
intensity[38] = ["6:35", "10:35", "9:08", "02:07", "04:15", "05:19", "05:49", "08:33", "01:56", "04:54", "0", "0", "0", "54", "1:50", "0"];
intensity[39] = ["6:27", "10:23", "8:57", "02:05", "04:10", "05:12", "05:41", "08:22", "01:54", "04:48", "0", "0", "0", "53", "1:48", "0"];
intensity[40] = ["6:19", "10:11", "8:46", "02:02", "04:05", "05:06", "05:35", "08:12", "01:52", "04:42", "0", "0", "0", "52", "1:46", "0"];
intensity[41] = ["6:12", "9:59", "8:35", "02:00", "04:00", "05:00", "05:28", "08:02", "01:50", "04:36", "05:00", "0", "0", "51", "1:44", "0"];
intensity[42] = ["6:05", "9:48", "8:25", "01:57", "03:55", "04:54", "05:22", "07:52", "01:48", "04:31", "04:55", "0", "0", "50", "1:42", "0"];
intensity[43] = ["5:58", "9:37", "8:15", "01:55", "03:51", "04:49", "05:16", "07:42", "01:46", "04:26", "04:50", "0", "0", "49", "1:40", "0"];
intensity[44] = ["5:52", "9:27", "8:06", "01:53", "03:46", "04:43", "05:09", "07:33", "01:44", "04:21", "04:45", "0", "0", "48", "98", "0"];
intensity[45] = ["5:46", "9:17", "7:57", "01:51", "03:42", "04:38", "05:04", "07:25", "01:42", "04:16", "04:40", "0", "0", "47", "96", "0"];
intensity[46] = ["5:40", "9:07", "7:48", "01:49", "03:38", "04:33", "04:58", "07:17", "01:40", "04:12", "04:35", "05:00", "0", "46", "94", "0"];
intensity[47] = ["5:34", "8:58", "7:40", "01:47", "03:35", "04:29", "04:54", "07:10", "01:38", "04:07", "04:29", "04:54", "0", "45", "92", "0"];
intensity[48] = ["5:28", "8:49", "7:32", "01:45", "03:31", "04:24", "04:48", "07:02", "01:36", "04:03", "04:25", "04:49", "0", "44", "90", "0"];
intensity[49] = ["5:23", "8:40", "7:24", "01:43", "03:28", "04:20", "04:44", "06:55", "01:35", "03:59", "04:21", "04:45", "0", "44", "89", "0"];
intensity[50] = ["5:18", "8:32", "7:17", "01:42", "03:24", "04:15", "04:39", "06:51", "01:33", "03:55", "04:17", "04:41", "0", "43", "87", "0"];
intensity[51] = ["5:13", "8:24", "7:09", "01:40", "03:21", "04:11", "04:35", "06:44", "01:32", "03:51", "04:12", "04:36", "0", "42", "86", "0"];
intensity[52] = ["5:08", "8:16", "7:02", "01:38", "03:17", "04:07", "04:30", "06:38", "01:31", "03:48", "04:09", "04:33", "0", "42", "85", "0"];
intensity[53] = ["5:04", "8:09", "6:56", "01:37", "03:15", "04:04", "04:27", "06:32", "01:30", "03:44", "04:05", "04:29", "0", "41", "84", "0"];
intensity[54] = ["4:59", "8:01", "6:49", "01:35", "03:12", "04:00", "04:23", "06:26", "01:28", "03:41", "04:02", "04:25", "0", "40", "82", "0"];
intensity[55] = ["4:55", "7:54", "6:43", "01:34", "03:09", "03:56", "04:18", "06:20", "01:27", "03:37", "03:58", "04:21", "0", "40", "81", "0"];
intensity[56] = ["4:50", "7:48", "6:37", "01:33", "03:06", "03:53", "04:15", "06:15", "01:26", "03:34", "03:55", "04:18", "0", "39", "80", "0"];
intensity[57] = ["4:46", "7:41", "6:31", "01:31", "03:04", "03:50", "04:12", "06:09", "01:25", "03:31", "03:52", "04:15", "0", "39", "79", "0"];
intensity[58] = ["4:42", "7:34", "6:25", "01:30", "03:00", "03:45", "04:07", "06:04", "01:23", "03:28", "03:48", "04:10", "0", "38", "77", "0"];
intensity[59] = ["4:38", "7:28", "6:19", "01:29", "02:58", "03:43", "04:04", "05:59", "01:22", "03:25", "03:45", "04:07", "0", "37", "76", "0"];
intensity[60] = ["4:35", "7:22", "6:14", "01:28", "02:56", "03:40", "04:01", "05:54", "01:21", "03:23", "03:42", "04:03", "0", "37", "75", "2:30"];
intensity[61] = ["4:31", "7:16", "6:09", "01:26", "02:53", "03:37", "03:58", "05:50", "01:20", "03:20", "03:39", "04:00", "0", "36", "74", "2:28"];
intensity[62] = ["4:27", "7:11", "6:04", "01:25", "02:51", "03:34", "03:54", "05:45", "01:19", "03:17", "03:36", "03:57", "0", "36", "73", "2:26"];
intensity[63] = ["4:24", "7:05", "5:59", "01:24", "02:49", "03:32", "03:52", "05:41", "01:18", "03:15", "03:33", "03:54", "0", "35", "72", "2:24"];
intensity[64] = ["4:21", "7:00", "5:54", "01:23", "02:47", "03:29", "03:49", "05:36", "01:17", "03:12", "03:30", "03:51", "0", "35", "71", "2:22"];
intensity[65] = ["4:18", "6:54", "5:49", "01:22", "02:45", "03:26", "03:46", "05:32", "01:16", "03:10", "03:28", "03:48", "0", "34", "70", "2:20"];
intensity[66] = ["4:14", "6:49", "5:45", "01:21", "02:43", "03:24", "03:43", "05:28", "01:15", "03:08", "03:25", "03:45", "5:00", "34", "69", "2:18"];
intensity[67] = ["4:11", "6:44", "5:40", "01:20", "02:41", "03:21", "03:40", "05:24", "01:14", "03:05", "03:22", "03:42", "4:57", "33", "68", "2:16"];
intensity[68] = ["4:08", "6:39", "5:36", "01:19", "02:39", "03:19", "03:38", "05:20", "01:13", "03:03", "03:20", "03:39", "4:53", "33", "67", "2:14"];
intensity[69] = ["4:05", "6:35", "5:32", "01:18", "02:37", "03:16", "03:35", "05:16", "01:12", "03:01", "03:18", "03:36", "4:50", "32", "66", "2:12"];
intensity[70] = ["4:02", "6:30", "5:28", "01:17", "02:35", "03:14", "03:32", "05:13", "01:11", "02:59", "03:16", "03:34", "4:46", "32", "65", "2:10"];
intensity[71] = ["4:00", "6:26", "5:24", "01:16", "02:33", "03:12", "03:30", "05:09", "01:10", "02:57", "03:13", "03:31", "4:43", "31", "64", "2:08"];
intensity[72] = ["3:57", "6:21", "5:20", "01:16", "02:32", "03:10", "03:28", "05:05", "01:09", "02:55", "03:11", "03:29", "4:40", "31", "63", "2:06"];
intensity[73] = ["3:54", "6:17", "5:16", "01:15", "02:30", "03:08", "03:26", "05:02", "01:09", "02:53", "03:09", "03:27", "4:37", "31", "62", "2:05"];
intensity[74] = ["3:52", "6:13", "5:12", "01:14", "02:29", "03:06", "03:23", "04:59", "01:08", "02:51", "03:07", "03:25", "4:34", "30", "62", "2:04"];
intensity[75] = ["3:49", "6:09", "5:09", "01:14", "02:27", "03:04", "03:21", "04:56", "01:07", "02:49", "03:05", "03:22", "4:31", "30", "61", "2:03"];
intensity[76] = ["3:47", "6:05", "5:05", "01:13", "02:26", "03:02", "03:19", "04:52", "01:06", "02:48", "03:03", "03:20", "4:28", "29", "60", "2:02"];
intensity[77] = ["3:44", "6:01", "5:01", "01:12", "02:24", "03:00", "03:17", "04:49", "01:05", "02:46", "03:01", "03:18", "4:25", "29", "59", "2:00"];
intensity[78] = ["3:42", "5:57", "4:58", "01:11", "02:22", "02:58", "03:15", "04:46", "01:05", "02:44", "02:59", "03:16", "4:23", "29", "59", "1:59"];
intensity[79] = ["3:40", "5:54", "4:55", "01:10", "02:21", "02:56", "03:13", "04:43", "01:04", "02:42", "02:57", "03:14", "4:20", "28", "58", "1:58"];
intensity[80] = ["3:38", "5:50", "4:52", "01:10", "02:19", "02:54", "03:11", "04:41", "01:04", "02:41", "02:56", "03:12", "4:17", "28", "58", "1:56"];
intensity[81] = ["3:35", "5:46", "4:49", "01:09", "02:18", "02:53", "03:09", "04:38", "01:03", "02:39", "02:54", "03:10", "4:15", "28", "57", "1:55"];
intensity[82] = ["3:33", "5:43", "4:46", "01:08", "02:17", "02:51", "03:07", "04:35", "01:02", "02:38", "02:52", "03:08", "4:12", "27", "56", "1:54"];
intensity[83] = ["3:31", "5:40", "4:43", "01:08", "02:15", "02:49", "03:05", "04:32", "01:02", "02:36", "02:51", "03:07", "4:10", "27", "56", "1:53"];
intensity[84] = ["3:29", "5:36", "4:40", "01:07", "02:14", "02:48", "03:04", "04:30", "01:01", "02:35", "02:49", "03:05", "4:08", "27", "55", "1:52"];
intensity[85] = ["3:27", "5:33", "4:37", "01:06", "02:13", "02:46", "03:02", "04:27", "01:01", "02:33", "02:47", "03:03", "4:05", "27", "55", "1:51"];


const sortedRaces = R.sortBy(R.prop('distance'), allRaces);
const sortedLabels = R.map(R.prop('label'), sortedRaces);
const indices = R.zipObj(sortedLabels, [...Array(sortedLabels.length).keys()]);

const processTable = R.compose(
  R.map(R.map(timeToSec)),
  R.slice(VDOT_MIN, VDOT_MAX + 1)
);

const raceTimesSec = R.zipObj(
  R.range(VDOT_MIN, VDOT_MAX + 1),
  processTable(raceTimes)
);

const intensitySec = R.zipObj(
  R.range(VDOT_MIN, VDOT_MAX + 1),
  processTable(intensity)
);

const minPerformanceSec = {
  vdot: VDOT_MIN,
  percentage: 0,
  equivalents: R.zipObj(sortedLabels, raceTimesSec[VDOT_MIN]),
}

const maxPerformanceSec = {
  vdot: VDOT_MIN,
  percentage: 0,
  equivalents: R.zipObj(sortedLabels, raceTimesSec[VDOT_MAX]),
}

function getPerformance(race, time) {
  if (!R.is(Object, race) || !R.is(String, race.label)) {
    throw new Error('Race object not valid. Valid ones are in constants, import from there.');
  }
  const timeSec = timeToSec(time);
  const equivLens = R.lensProp('equivalents');
  const perfSec = getPerformanceSec(race, timeSec);
  return R.over(equivLens, R.map(secToTime), perfSec);
}

function getPerformanceSec(race, timeSec) {
  if (!R.is(Object, race) || !R.is(String, race.label)) {
    throw new Error('Race object not valid. Valid ones are in constants, import from there.');
  }
  if (!R.is(Number, timeSec)) {
    throw new Error('Time must be in seconds.');
  }
  const specificRaceTimes = R.compose(
    R.sortBy(R.prop(0)),
    R.toPairs,
    R.map(times => times[indices[race.label]])
  )(raceTimesSec);

  const skillAboveIdx = R.findIndex(R.compose(R.gt(timeSec), R.prop(1)), specificRaceTimes);
  if (skillAboveIdx === 0) {
    return minPerformanceSec;
  }

  if (skillAboveIdx < 0) {
    return maxPerformanceSec;
  }

  const skillBelowIdx = skillAboveIdx - 1;
  const [vdotAbove, timeAbove] = specificRaceTimes[skillAboveIdx];
  const [vdotBelow, timeBelow] = specificRaceTimes[skillBelowIdx];
  const percentage = ((timeSec - timeBelow) / (timeAbove - timeBelow));

  const [below, above] = [raceTimesSec[vdotBelow], raceTimesSec[vdotAbove]];
  const addPercentage = (p, [t1, t2]) => (t1 + p * (t2 - t1));
  const equivalents = R.compose(
    R.zipObj(sortedLabels),
    R.map(addPercentage.bind(null, percentage))
  )(R.zip(below, above));

  const vdot = parseInt(specificRaceTimes[skillBelowIdx][0], 10);

  return {
    vdot,
    percentage,
    equivalents,
    trainingIntensity: getTrainingIntensitySec(vdot, percentage),
  }
}

function getTrainingIntensitySec(vdot, percentage) {
  if (vdot < VDOT_MIN)
    return intensitySec[VDOT_MIN];
  if (vdot >= VDOT_MAX)
    return intensitySec[VDOT_MAX];
  const [below, above] = [intensitySec[vdot], intensitySec[vdot + 1]];
  const addPercentage = (p, [t1, t2]) => t1 > 0 ? (t1 + p * (t2 - t1)) : t1;
  return R.compose(
    R.zipObj(allIntensities),
    R.map(addPercentage.bind(null, percentage))
  )(R.zip(below, above));
}

export {
  getPerformance,
  getPerformanceSec,
  minPerformanceSec,
  maxPerformanceSec,
}