// Gallery page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Image data - all images from both folders
    const imageData = [
        // Images from assets/images/ - assigning to recent years
        { src: "assets/images/alumni-race.JPG", alt: "Alumni race", category: "2024", title: "Alumni Race", description: "Alumni racing event" },
        { src: "assets/images/alumni-racing.jpeg", alt: "Alumni racing", category: "2024", title: "Alumni Racing", description: "Alumni racing competition" },
        { src: "assets/images/drew-closeup.jpg", alt: "Drew closeup", category: "2023", title: "Drew Closeup", description: "Team member portrait" },
        { src: "assets/images/drew-closeup2.jpg", alt: "Drew closeup 2", category: "2023", title: "Drew Closeup 2", description: "Team member portrait" },
        { src: "assets/images/grilling-artsy.JPG", alt: "Grilling artsy", category: "2023", title: "Grilling Artsy", description: "Social gathering" },
        { src: "assets/images/hands-artsy.JPG", alt: "Hands artsy", category: "2023", title: "Hands Artsy", description: "Artistic shot" },
        { src: "assets/images/kate-closeup.JPG", alt: "Kate closeup", category: "2023", title: "Kate Closeup", description: "Team member portrait" },
        { src: "assets/images/kate-race-tulane.jpg", alt: "Kate race tulane", category: "2024", title: "Kate Race Tulane", description: "Racing at Tulane" },
        { src: "assets/images/lineup-racing-alumni.jpg", alt: "Lineup racing alumni", category: "2024", title: "Lineup Racing Alumni", description: "Alumni racing lineup" },
        { src: "assets/images/maggie-goofball.JPG", alt: "Maggie goofball", category: "2023", title: "Maggie Goofball", description: "Team member fun" },
        { src: "assets/images/racing-austin-2.JPG", alt: "Racing Austin 2", category: "2024", title: "Racing Austin 2", description: "Racing in Austin" },
        { src: "assets/images/racing-austin1.JPG", alt: "Racing Austin 1", category: "2024", title: "Racing Austin 1", description: "Racing in Austin" },
        { src: "assets/images/racing-tulane.jpg", alt: "Racing Tulane", category: "2024", title: "Racing Tulane", description: "Racing at Tulane" },
        { src: "assets/images/ryan-w-megaphone.jpeg", alt: "Ryan with megaphone", category: "2023", title: "Ryan with Megaphone", description: "Event coordination" },
        { src: "assets/images/team-huddle.JPG", alt: "Team huddle", category: "2023", title: "Team Huddle", description: "Team building moment" },
        { src: "assets/images/tulane-girls.JPG", alt: "Tulane girls", category: "2024", title: "Tulane Girls", description: "Team at Tulane" },
        
        // Images from assets/unz_images/ - properly categorized by actual years
        { src: "assets/unz_images/2011 Match Race Nationals - San Francisco2.JPG", alt: "2011 Match Race Nationals", category: "2011", title: "2011 Match Race Nationals", description: "National competition in San Francisco" },
        { src: "assets/unz_images/2012Sugar Bowl2.JPG", alt: "2012 Sugar Bowl", category: "2012", title: "2012 Sugar Bowl", description: "Sugar Bowl event" },
        { src: "assets/unz_images/2013 McCarthy Cup.JPG", alt: "2013 McCarthy Cup", category: "2012", title: "2013 McCarthy Cup", description: "McCarthy Cup competition" },
        { src: "assets/unz_images/2013 McCarthy Cup2.JPG", alt: "2013 McCarthy Cup 2", category: "2012", title: "2013 McCarthy Cup 2", description: "McCarthy Cup competition" },
        { src: "assets/unz_images/2013 McCarthy Cup3.JPG", alt: "2013 McCarthy Cup 3", category: "2012", title: "2013 McCarthy Cup 3", description: "McCarthy Cup competition" },
        { src: "assets/unz_images/21_mw.jpeg", alt: "21 MW", category: "2022", title: "21 MW", description: "Racing event" },
        { src: "assets/unz_images/22_worlds.jpeg", alt: "22 Worlds", category: "2022", title: "22 Worlds", description: "World championship" },
        { src: "assets/unz_images/borden_2009.jpeg", alt: "Borden 2009", category: "2011", title: "Borden 2009", description: "2009 event" },
        { src: "assets/unz_images/chelsea_2011.jpeg", alt: "Chelsea 2011", category: "2011", title: "Chelsea 2011", description: "Team member Chelsea" },
        { src: "assets/unz_images/colin_jenny_nationals_2012.jpeg", alt: "Colin Jenny Nationals 2012", category: "2012", title: "Colin Jenny Nationals 2012", description: "National competition" },
        { src: "assets/unz_images/colin_jenny_rose_bowl_2011.jpeg", alt: "Colin Jenny Rose Bowl 2011", category: "2011", title: "Colin Jenny Rose Bowl 2011", description: "Rose Bowl event" },
        { src: "assets/unz_images/Copy of IMG_3054.JPG", alt: "Copy of IMG 3054", category: "2023", title: "Copy of IMG 3054", description: "Team photo" },
        { src: "assets/unz_images/Copy of IMG_3059.JPG", alt: "Copy of IMG 3059", category: "2023", title: "Copy of IMG 3059", description: "Team photo" },
        { src: "assets/unz_images/Copy of IMG_3064.JPG", alt: "Copy of IMG 3064", category: "2023", title: "Copy of IMG 3064", description: "Team photo" },
        { src: "assets/unz_images/DSC_0450.JPG", alt: "DSC 0450", category: "2023", title: "DSC 0450", description: "Sailing scenery" },
        { src: "assets/unz_images/DSC_0530.JPG", alt: "DSC 0530", category: "2023", title: "DSC 0530", description: "Sailing scenery" },
        { src: "assets/unz_images/DSC_0535.JPG", alt: "DSC 0535", category: "2023", title: "DSC 0535", description: "Sailing scenery" },
        { src: "assets/unz_images/FP8A0413.JPG", alt: "FP8A 0413", category: "2023", title: "FP8A 0413", description: "Racing action" },
        { src: "assets/unz_images/FP8A0415.JPG", alt: "FP8A 0415", category: "2023", title: "FP8A 0415", description: "Racing action" },
        { src: "assets/unz_images/FP8A4735.JPG", alt: "FP8A 4735", category: "2023", title: "FP8A 4735", description: "Racing action" },
        { src: "assets/unz_images/FP8A4791.JPG", alt: "FP8A 4791", category: "2023", title: "FP8A 4791", description: "Racing action" },
        { src: "assets/unz_images/gg_2011.jpeg", alt: "GG 2011", category: "2011", title: "GG 2011", description: "2011 event" },
        { src: "assets/unz_images/good_roll_tack_2012.jpeg", alt: "Good Roll Tack 2012", category: "2012", title: "Good Roll Tack 2012", description: "Sailing technique" },
        { src: "assets/unz_images/IMGS0003.JPG", alt: "IMGS 0003", category: "2023", title: "IMGS 0003", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0008.JPG", alt: "IMGS 0008", category: "2023", title: "IMGS 0008", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0033.JPG", alt: "IMGS 0033", category: "2023", title: "IMGS 0033", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0039.JPG", alt: "IMGS 0039", category: "2023", title: "IMGS 0039", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0040.JPG", alt: "IMGS 0040", category: "2023", title: "IMGS 0040", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0084.JPG", alt: "IMGS 0084", category: "2023", title: "IMGS 0084", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0120.JPG", alt: "IMGS 0120", category: "2023", title: "IMGS 0120", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0125.JPG", alt: "IMGS 0125", category: "2023", title: "IMGS 0125", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0139.JPG", alt: "IMGS 0139", category: "2023", title: "IMGS 0139", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0140.JPG", alt: "IMGS 0140", category: "2023", title: "IMGS 0140", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0155.JPG", alt: "IMGS 0155", category: "2023", title: "IMGS 0155", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0269.JPG", alt: "IMGS 0269", category: "2023", title: "IMGS 0269", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0270.JPG", alt: "IMGS 0270", category: "2023", title: "IMGS 0270", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0273.JPG", alt: "IMGS 0273", category: "2023", title: "IMGS 0273", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0284.JPG", alt: "IMGS 0284", category: "2023", title: "IMGS 0284", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0285.JPG", alt: "IMGS 0285", category: "2023", title: "IMGS 0285", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0290.JPG", alt: "IMGS 0290", category: "2023", title: "IMGS 0290", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0296.JPG", alt: "IMGS 0296", category: "2023", title: "IMGS 0296", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0297.JPG", alt: "IMGS 0297", category: "2023", title: "IMGS 0297", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0302.JPG", alt: "IMGS 0302", category: "2023", title: "IMGS 0302", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0305.JPG", alt: "IMGS 0305", category: "2023", title: "IMGS 0305", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0306.JPG", alt: "IMGS 0306", category: "2023", title: "IMGS 0306", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0308.JPG", alt: "IMGS 0308", category: "2023", title: "IMGS 0308", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0309.JPG", alt: "IMGS 0309", category: "2023", title: "IMGS 0309", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0315.JPG", alt: "IMGS 0315", category: "2023", title: "IMGS 0315", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGS0316.JPG", alt: "IMGS 0316", category: "2023", title: "IMGS 0316", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGT0106.JPG", alt: "IMGT 0106", category: "2023", title: "IMGT 0106", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGT0126.JPG", alt: "IMGT 0126", category: "2023", title: "IMGT 0126", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGT0127.JPG", alt: "IMGT 0127", category: "2023", title: "IMGT 0127", description: "Sailing scenery" },
        { src: "assets/unz_images/IMGT0130.JPG", alt: "IMGT 0130", category: "2023", title: "IMGT 0130", description: "Sailing scenery" },
        { src: "assets/unz_images/IMG_0040.JPG", alt: "IMG 0040", category: "2023", title: "IMG 0040", description: "Team photo" },
        { src: "assets/unz_images/IMG_0073.JPG", alt: "IMG 0073", category: "2023", title: "IMG 0073", description: "Team photo" },
        { src: "assets/unz_images/IMG_0115.JPG", alt: "IMG 0115", category: "2023", title: "IMG 0115", description: "Team photo" },
        { src: "assets/unz_images/IMG_0357.JPG", alt: "IMG 0357", category: "2023", title: "IMG 0357", description: "Team photo" },
        { src: "assets/unz_images/IMG_0426.jpeg", alt: "IMG 0426", category: "2023", title: "IMG 0426", description: "Team photo" },
        { src: "assets/unz_images/IMG_0616.jpeg", alt: "IMG 0616", category: "2023", title: "IMG 0616", description: "Team photo" },
        { src: "assets/unz_images/IMG_0931.jpeg", alt: "IMG 0931", category: "2023", title: "IMG 0931", description: "Team photo" },
        { src: "assets/unz_images/IMG_0980.jpeg", alt: "IMG 0980", category: "2023", title: "IMG 0980", description: "Team photo" },
        { src: "assets/unz_images/IMG_1083.jpeg", alt: "IMG 1083", category: "2023", title: "IMG 1083", description: "Team photo" },
        { src: "assets/unz_images/IMG_1640_Original.JPG", alt: "IMG 1640 Original", category: "2023", title: "IMG 1640 Original", description: "Team photo" },
        { src: "assets/unz_images/IMG_2813.jpeg", alt: "IMG 2813", category: "2023", title: "IMG 2813", description: "Team photo" },
        { src: "assets/unz_images/IMG_2904.JPG", alt: "IMG 2904", category: "2023", title: "IMG 2904", description: "Team photo" },
        { src: "assets/unz_images/IMG_3017.JPG", alt: "IMG 3017", category: "2023", title: "IMG 3017", description: "Team photo" },
        { src: "assets/unz_images/IMG_3036.JPG", alt: "IMG 3036", category: "2023", title: "IMG 3036", description: "Team photo" },
        { src: "assets/unz_images/IMG_3040.JPG", alt: "IMG 3040", category: "2023", title: "IMG 3040", description: "Team photo" },
        { src: "assets/unz_images/IMG_3047.JPG", alt: "IMG 3047", category: "2023", title: "IMG 3047", description: "Team photo" },
        { src: "assets/unz_images/IMG_3060.JPG", alt: "IMG 3060", category: "2023", title: "IMG 3060", description: "Team photo" },
        { src: "assets/unz_images/IMG_4387.JPG", alt: "IMG 4387", category: "2023", title: "IMG 4387", description: "Team photo" },
        { src: "assets/unz_images/IMG_4410.JPG", alt: "IMG 4410", category: "2023", title: "IMG 4410", description: "Team photo" },
        { src: "assets/unz_images/IMG_4416.JPG", alt: "IMG 4416", category: "2023", title: "IMG 4416", description: "Team photo" },
        { src: "assets/unz_images/IMG_4417.JPG", alt: "IMG 4417", category: "2023", title: "IMG 4417", description: "Team photo" },
        { src: "assets/unz_images/IMG_4419.JPG", alt: "IMG 4419", category: "2023", title: "IMG 4419", description: "Team photo" },
        { src: "assets/unz_images/IMG_4421.JPG", alt: "IMG 4421", category: "2023", title: "IMG 4421", description: "Team photo" },
        { src: "assets/unz_images/IMG_4422.JPG", alt: "IMG 4422", category: "2023", title: "IMG 4422", description: "Team photo" },
        { src: "assets/unz_images/IMG_4432.JPG", alt: "IMG 4432", category: "2023", title: "IMG 4432", description: "Team photo" },
        { src: "assets/unz_images/IMG_4438.JPG", alt: "IMG 4438", category: "2023", title: "IMG 4438", description: "Team photo" },
        { src: "assets/unz_images/IMG_4448.JPG", alt: "IMG 4448", category: "2023", title: "IMG 4448", description: "Team photo" },
        { src: "assets/unz_images/IMG_4457.JPG", alt: "IMG 4457", category: "2023", title: "IMG 4457", description: "Team photo" },
        { src: "assets/unz_images/IMG_4557.jpeg", alt: "IMG 4557", category: "2023", title: "IMG 4557", description: "Team photo" },
        { src: "assets/unz_images/IMG_4853.jpeg", alt: "IMG 4853", category: "2023", title: "IMG 4853", description: "Team photo" },
        { src: "assets/unz_images/IMG_5021.JPG", alt: "IMG 5021", category: "2023", title: "IMG 5021", description: "Team photo" },
        { src: "assets/unz_images/IMG_5022.JPG", alt: "IMG 5022", category: "2023", title: "IMG 5022", description: "Team photo" },
        { src: "assets/unz_images/IMG_5025.JPG", alt: "IMG 5025", category: "2023", title: "IMG 5025", description: "Team photo" },
        { src: "assets/unz_images/IMG_5033.JPG", alt: "IMG 5033", category: "2023", title: "IMG 5033", description: "Team photo" },
        { src: "assets/unz_images/IMG_5037.JPG", alt: "IMG 5037", category: "2023", title: "IMG 5037", description: "Team photo" },
        { src: "assets/unz_images/IMG_5042.JPG", alt: "IMG 5042", category: "2023", title: "IMG 5042", description: "Team photo" },
        { src: "assets/unz_images/IMG_5047.JPG", alt: "IMG 5047", category: "2023", title: "IMG 5047", description: "Team photo" },
        { src: "assets/unz_images/IMG_5052.JPG", alt: "IMG 5052", category: "2023", title: "IMG 5052", description: "Team photo" },
        { src: "assets/unz_images/IMG_5056.JPG", alt: "IMG 5056", category: "2023", title: "IMG 5056", description: "Team photo" },
        { src: "assets/unz_images/IMG_5059.JPG", alt: "IMG 5059", category: "2023", title: "IMG 5059", description: "Team photo" },
        { src: "assets/unz_images/IMG_5064.JPG", alt: "IMG 5064", category: "2023", title: "IMG 5064", description: "Team photo" },
        { src: "assets/unz_images/IMG_5068.JPG", alt: "IMG 5068", category: "2023", title: "IMG 5068", description: "Team photo" },
        { src: "assets/unz_images/IMG_5185.JPG", alt: "IMG 5185", category: "2023", title: "IMG 5185", description: "Team photo" },
        { src: "assets/unz_images/IMG_5187.JPG", alt: "IMG 5187", category: "2023", title: "IMG 5187", description: "Team photo" },
        { src: "assets/unz_images/IMG_5196.JPG", alt: "IMG 5196", category: "2023", title: "IMG 5196", description: "Team photo" },
        { src: "assets/unz_images/IMG_5408.jpeg", alt: "IMG 5408", category: "2023", title: "IMG 5408", description: "Team photo" },
        { src: "assets/unz_images/IMG_5411.jpeg", alt: "IMG 5411", category: "2023", title: "IMG 5411", description: "Team photo" },
        { src: "assets/unz_images/IMG_5420.jpeg", alt: "IMG 5420", category: "2023", title: "IMG 5420", description: "Team photo" },
        { src: "assets/unz_images/IMG_5422.jpeg", alt: "IMG 5422", category: "2023", title: "IMG 5422", description: "Team photo" },
        { src: "assets/unz_images/IMG_5448.jpeg", alt: "IMG 5448", category: "2023", title: "IMG 5448", description: "Team photo" },
        { src: "assets/unz_images/IMG_5450.jpeg", alt: "IMG 5450", category: "2023", title: "IMG 5450", description: "Team photo" },
        { src: "assets/unz_images/IMG_5469.jpeg", alt: "IMG 5469", category: "2023", title: "IMG 5469", description: "Team photo" },
        { src: "assets/unz_images/IMG_5515.jpeg", alt: "IMG 5515", category: "2023", title: "IMG 5515", description: "Team photo" },
        { src: "assets/unz_images/IMG_5532.jpeg", alt: "IMG 5532", category: "2023", title: "IMG 5532", description: "Team photo" },
        { src: "assets/unz_images/IMG_5537.jpeg", alt: "IMG 5537", category: "2023", title: "IMG 5537", description: "Team photo" },
        { src: "assets/unz_images/IMG_5544.jpeg", alt: "IMG 5544", category: "2023", title: "IMG 5544", description: "Team photo" },
        { src: "assets/unz_images/IMG_5545.jpeg", alt: "IMG 5545", category: "2023", title: "IMG 5545", description: "Team photo" },
        { src: "assets/unz_images/IMG_5742.JPG", alt: "IMG 5742", category: "2023", title: "IMG 5742", description: "Team photo" },
        { src: "assets/unz_images/IMG_5821.jpeg", alt: "IMG 5821", category: "2023", title: "IMG 5821", description: "Team photo" },
        { src: "assets/unz_images/IMG_5982.jpeg", alt: "IMG 5982", category: "2023", title: "IMG 5982", description: "Team photo" },
        { src: "assets/unz_images/IMG_6216.JPG", alt: "IMG 6216", category: "2023", title: "IMG 6216", description: "Team photo" },
        { src: "assets/unz_images/IMG_6256.JPG", alt: "IMG 6256", category: "2023", title: "IMG 6256", description: "Team photo" },
        { src: "assets/unz_images/IMG_6507.jpeg", alt: "IMG 6507", category: "2023", title: "IMG 6507", description: "Team photo" },
        { src: "assets/unz_images/IMG_6958.jpeg", alt: "IMG 6958", category: "2023", title: "IMG 6958", description: "Team photo" },
        { src: "assets/unz_images/IMG_6981.jpeg", alt: "IMG 6981", category: "2023", title: "IMG 6981", description: "Team photo" },
        { src: "assets/unz_images/IMG_6983.jpeg", alt: "IMG 6983", category: "2023", title: "IMG 6983", description: "Team photo" },
        { src: "assets/unz_images/IMG_9371.jpeg", alt: "IMG 9371", category: "2023", title: "IMG 9371", description: "Team photo" },
        { src: "assets/unz_images/ior.jpeg", alt: "IOR", category: "2011", title: "IOR", description: "IOR racing" },
        { src: "assets/unz_images/j22_nats_2019.jpeg", alt: "J22 Nationals 2019", category: "2019", title: "J22 Nationals 2019", description: "J22 National competition" },
        { src: "assets/unz_images/kerry_2012.jpeg", alt: "Kerry 2012", category: "2012", title: "Kerry 2012", description: "Team member Kerry" },
        { src: "assets/unz_images/koletsos_2010.jpeg", alt: "Koletsos 2010", category: "2011", title: "Koletsos 2010", description: "Team member Koletsos" },
        { src: "assets/unz_images/match_race_team_2011.jpeg", alt: "Match Race Team 2011", category: "2011", title: "Match Race Team 2011", description: "Match race team" },
        { src: "assets/unz_images/P1074170.jpg", alt: "P107 4170", category: "2023", title: "P107 4170", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074174.jpg", alt: "P107 4174", category: "2023", title: "P107 4174", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074270.jpg", alt: "P107 4270", category: "2023", title: "P107 4270", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074287.jpg", alt: "P107 4287", category: "2023", title: "P107 4287", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074310.jpg", alt: "P107 4310", category: "2023", title: "P107 4310", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074320.jpg", alt: "P107 4320", category: "2023", title: "P107 4320", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074354.jpg", alt: "P107 4354", category: "2023", title: "P107 4354", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074360.jpg", alt: "P107 4360", category: "2023", title: "P107 4360", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074362.jpg", alt: "P107 4362", category: "2023", title: "P107 4362", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074379.jpg", alt: "P107 4379", category: "2023", title: "P107 4379", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074445.jpg", alt: "P107 4445", category: "2023", title: "P107 4445", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074453.jpg", alt: "P107 4453", category: "2023", title: "P107 4453", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074483.jpg", alt: "P107 4483", category: "2023", title: "P107 4483", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074487.jpg", alt: "P107 4487", category: "2023", title: "P107 4487", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074504.jpg", alt: "P107 4504", category: "2023", title: "P107 4504", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074509.jpg", alt: "P107 4509", category: "2023", title: "P107 4509", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074536.jpg", alt: "P107 4536", category: "2023", title: "P107 4536", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074650.jpg", alt: "P107 4650", category: "2023", title: "P107 4650", description: "Sailing scenery" },
        { src: "assets/unz_images/P1074895.jpg", alt: "P107 4895", category: "2023", title: "P107 4895", description: "Sailing scenery" },
        { src: "assets/unz_images/P1085830.jpg", alt: "P108 5830", category: "2023", title: "P108 5830", description: "Sailing scenery" },
        { src: "assets/unz_images/P1085846.jpg", alt: "P108 5846", category: "2023", title: "P108 5846", description: "Sailing scenery" },
        { src: "assets/unz_images/P1086011-Enhanced-NR.jpg", alt: "P108 6011 Enhanced", category: "2023", title: "P108 6011 Enhanced", description: "Enhanced sailing scenery" },
        { src: "assets/unz_images/P1086312-Enhanced-NR.jpg", alt: "P108 6312 Enhanced", category: "2023", title: "P108 6312 Enhanced", description: "Enhanced sailing scenery" },
        { src: "assets/unz_images/P1086375-Enhanced-NR.jpg", alt: "P108 6375 Enhanced", category: "2023", title: "P108 6375 Enhanced", description: "Enhanced sailing scenery" },
        { src: "assets/unz_images/P1096465-Enhanced-NR.jpg", alt: "P109 6465 Enhanced", category: "2023", title: "P109 6465 Enhanced", description: "Enhanced sailing scenery" },
        { src: "assets/unz_images/P1107870.jpg", alt: "P110 7870", category: "2023", title: "P110 7870", description: "Sailing scenery" },
        { src: "assets/unz_images/P1107942.jpg", alt: "P110 7942", category: "2023", title: "P110 7942", description: "Sailing scenery" },
        { src: "assets/unz_images/P1107948.jpg", alt: "P110 7948", category: "2023", title: "P110 7948", description: "Sailing scenery" },
        { src: "assets/unz_images/P1108012.JPG", alt: "P110 8012", category: "2023", title: "P110 8012", description: "Sailing scenery" },
        { src: "assets/unz_images/P1108022.jpg", alt: "P110 8022", category: "2023", title: "P110 8022", description: "Sailing scenery" },
        { src: "assets/unz_images/P1108072.jpg", alt: "P110 8072", category: "2023", title: "P110 8072", description: "Sailing scenery" },
        { src: "assets/unz_images/P1108097.jpg", alt: "P110 8097", category: "2023", title: "P110 8097", description: "Sailing scenery" },
        { src: "assets/unz_images/rigging_2010.jpeg", alt: "Rigging 2010", category: "2011", title: "Rigging 2010", description: "Rigging event" },
        { src: "assets/unz_images/smu_2012.jpeg", alt: "SMU 2012", category: "2012", title: "SMU 2012", description: "SMU event" },
        { src: "assets/unz_images/sport_2019.jpeg", alt: "Sport 2019", category: "2019", title: "Sport 2019", description: "Sport racing" },
        { src: "assets/unz_images/sugar_bowl_2011.jpeg", alt: "Sugar Bowl 2011", category: "2011", title: "Sugar Bowl 2011", description: "Sugar Bowl event" },
        { src: "assets/unz_images/sugar_rose_2011.jpeg", alt: "Sugar Rose 2011", category: "2011", title: "Sugar Rose 2011", description: "Sugar Rose event" },
        { src: "assets/unz_images/TAMUSAIL-13.jpg", alt: "TAMU Sail 13", category: "2012", title: "TAMU Sail 13", description: "TAMU sailing" },
        { src: "assets/unz_images/TAMUSAIL-15.jpg", alt: "TAMU Sail 15", category: "2012", title: "TAMU Sail 15", description: "TAMU sailing" },
        { src: "assets/unz_images/TAMUSAIL-19.jpg", alt: "TAMU Sail 19", category: "2012", title: "TAMU Sail 19", description: "TAMU sailing" },
        { src: "assets/unz_images/TAMUSAIL-26.jpg", alt: "TAMU Sail 26", category: "2012", title: "TAMU Sail 26", description: "TAMU sailing" },
        { src: "assets/unz_images/TAMUSAIL-3.jpg", alt: "TAMU Sail 3", category: "2012", title: "TAMU Sail 3", description: "TAMU sailing" },
        { src: "assets/unz_images/TAMUSAIL-8.jpg", alt: "TAMU Sail 8", category: "2012", title: "TAMU Sail 8", description: "TAMU sailing" },
        { src: "assets/unz_images/Tezza-0091.JPG", alt: "Tezza 0091", category: "2023", title: "Tezza 0091", description: "Sailing scenery" },
        { src: "assets/unz_images/Tezza-1147.JPG", alt: "Tezza 1147", category: "2023", title: "Tezza 1147", description: "Sailing scenery" },
        { src: "assets/unz_images/Tezza-1497.JPG", alt: "Tezza 1497", category: "2023", title: "Tezza 1497", description: "Sailing scenery" },
        { src: "assets/unz_images/Tezza-2053.JPG", alt: "Tezza 2053", category: "2023", title: "Tezza 2053", description: "Sailing scenery" },
        { src: "assets/unz_images/Tezza-2173.JPG", alt: "Tezza 2173", category: "2023", title: "Tezza 2173", description: "Sailing scenery" },
        { src: "assets/unz_images/Tezza-2679.JPG", alt: "Tezza 2679", category: "2023", title: "Tezza 2679", description: "Sailing scenery" },
        { src: "assets/unz_images/Tezza-6052.JPG", alt: "Tezza 6052", category: "2023", title: "Tezza 6052", description: "Sailing scenery" },
        { src: "assets/unz_images/Tezza-6792.JPG", alt: "Tezza 6792", category: "2023", title: "Tezza 6792", description: "Sailing scenery" },
        { src: "assets/unz_images/Tezza-9217.JPG", alt: "Tezza 9217", category: "2023", title: "Tezza 9217", description: "Sailing scenery" },
        { src: "assets/unz_images/Tezza-9323.JPG", alt: "Tezza 9323", category: "2023", title: "Tezza 9323", description: "Sailing scenery" }
    ];

    // Gallery filtering variables
    let galleryItems = [];
    const yearFilterInput = document.getElementById('yearFilter');
    const clearFilterBtn = document.getElementById('clearFilter');

    // Function to create gallery items
    function createGalleryItem(imageData) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', imageData.category);
        
        galleryItem.innerHTML = `
            <img src="${imageData.src}" alt="${imageData.alt}" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h3>${imageData.title}</h3>
                    <p>${imageData.description}</p>
                </div>
                <i class="fas fa-expand"></i>
            </div>
        `;
        
        // Add loaded class to image when it finishes loading
        const img = galleryItem.querySelector('img');
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Also add loaded class if image is already cached
        if (img.complete) {
            img.classList.add('loaded');
        }
        
        return galleryItem;
    }

    // Load all images into the gallery
    function loadGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        
        imageData.forEach(image => {
            const galleryItem = createGalleryItem(image);
            galleryGrid.appendChild(galleryItem);
        });
        
        // Refresh gallery items reference and add listeners
        refreshGalleryItems();
        addLightboxListeners();
    }

    // Initialize gallery
    loadGallery();

    // Function to refresh gallery items reference
    function refreshGalleryItems() {
        galleryItems = document.querySelectorAll('.gallery-item');
    }

    // Filter gallery items based on year input
    function filterGalleryByYear() {
        const year = yearFilterInput.value;

        // Filter gallery items
        galleryItems.forEach(item => {
            const itemYear = item.getAttribute('data-category');
            if (year === '' || itemYear === year) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Clear filter button functionality
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', function() {
            yearFilterInput.value = '';
            filterGalleryByYear(); // Re-apply filter to show all
        });
    }

    // Add event listener for year input
    if (yearFilterInput) {
        yearFilterInput.addEventListener('input', filterGalleryByYear);
    }

    // Lightbox functionality
    function addLightboxListeners() {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const title = this.querySelector('.gallery-info h3')?.textContent || '';
                const description = this.querySelector('.gallery-info p')?.textContent || '';
                
                if (img) {
                    showLightbox(img.src, img.alt, title, description);
                }
            });
        });
    }



    function showLightbox(imageSrc, imageAlt, title, description) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <div class="lightbox-header">
                    <h3>${title}</h3>
                    <button class="lightbox-close">&times;</button>
                </div>
                <div class="lightbox-image">
                    <img src="${imageSrc}" alt="${imageAlt}">
                </div>
                <div class="lightbox-description">
                    <p>${description}</p>
                </div>
                <div class="lightbox-navigation">
                    <button class="lightbox-nav lightbox-prev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="lightbox-nav lightbox-next">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);

        // Close lightbox functionality
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
            }
        });

        // Navigation functionality
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        if (prevBtn && nextBtn) {
            const currentIndex = Array.from(galleryItems).findIndex(item => 
                item.querySelector('img').src === imageSrc
            );
            
            prevBtn.addEventListener('click', () => {
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
                const prevItem = galleryItems[prevIndex];
                const prevImg = prevItem.querySelector('img');
                const prevTitle = prevItem.querySelector('.gallery-info h3')?.textContent || '';
                const prevDescription = prevItem.querySelector('.gallery-info p')?.textContent || '';
                
                document.body.removeChild(lightbox);
                showLightbox(prevImg.src, prevImg.alt, prevTitle, prevDescription);
            });

            nextBtn.addEventListener('click', () => {
                const nextIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
                const nextItem = galleryItems[nextIndex];
                const nextImg = nextItem.querySelector('img');
                const nextTitle = nextItem.querySelector('.gallery-info h3')?.textContent || '';
                const nextDescription = nextItem.querySelector('.gallery-info p')?.textContent || '';
                
                document.body.removeChild(lightbox);
                showLightbox(nextImg.src, nextImg.alt, nextTitle, nextDescription);
            });
        }
    }

    // Upload functionality
    const uploadBtn = document.querySelector('.upload-option .btn-primary');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            showUploadModal();
        });
    }

    function showUploadModal() {
        const uploadModal = document.createElement('div');
        uploadModal.className = 'upload-modal';
        uploadModal.innerHTML = `
            <div class="upload-modal-content">
                <div class="upload-modal-header">
                    <h3>Upload Photos</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="upload-modal-body">
                    <form class="upload-form">
                        <div class="form-group">
                            <label for="photoTitle">Photo Title</label>
                            <input type="text" id="photoTitle" name="photoTitle" required>
                        </div>
                        <div class="form-group">
                            <label for="photoDescription">Description</label>
                            <textarea id="photoDescription" name="photoDescription" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="photoCategory">Category</label>
                            <select id="photoCategory" name="photoCategory" required>
                                <option value="">Select category</option>
                                <option value="races">Races</option>
                                <option value="events">Events</option>
                                <option value="scenery">Scenery</option>
                                <option value="social">Social</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="photoFile">Select Photos</label>
                            <input type="file" id="photoFile" name="photoFile" accept="image/*" multiple required>
                        </div>
                        <div class="upload-preview">
                            <div class="preview-images"></div>
                        </div>
                        <button type="submit" class="btn btn-primary">Upload Photos</button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(uploadModal);

        // Close modal functionality
        const closeBtn = uploadModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(uploadModal);
        });

        uploadModal.addEventListener('click', (e) => {
            if (e.target === uploadModal) {
                document.body.removeChild(uploadModal);
            }
        });

        // File preview functionality
        const fileInput = uploadModal.querySelector('#photoFile');
        const previewContainer = uploadModal.querySelector('.preview-images');

        fileInput.addEventListener('change', function() {
            previewContainer.innerHTML = '';
            const files = this.files;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const preview = document.createElement('div');
                        preview.className = 'preview-item';
                        preview.innerHTML = `
                            <img src="${e.target.result}" alt="Preview">
                            <span class="preview-name">${file.name}</span>
                        `;
                        previewContainer.appendChild(preview);
                    };
                    reader.readAsDataURL(file);
                }
            }
        });

        // Form submission
        const uploadForm = uploadModal.querySelector('.upload-form');
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate upload
            showUploadSuccess();
            document.body.removeChild(uploadModal);
        });
    }

    function showUploadSuccess() {
        const successModal = document.createElement('div');
        successModal.className = 'upload-success-modal';
        successModal.innerHTML = `
            <div class="upload-success-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Upload Successful!</h3>
                <p>Your photos have been uploaded successfully. They will be reviewed and added to the gallery soon.</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;

        document.body.appendChild(successModal);
    }

    // Guidelines modal
    const guidelinesBtn = document.querySelector('.upload-option .btn-outline');
    if (guidelinesBtn) {
        guidelinesBtn.addEventListener('click', function() {
            showGuidelinesModal();
        });
    }

    function showGuidelinesModal() {
        const guidelinesModal = document.createElement('div');
        guidelinesModal.className = 'guidelines-modal';
        guidelinesModal.innerHTML = `
            <div class="guidelines-modal-content">
                <div class="guidelines-modal-header">
                    <h3>Photo Submission Guidelines</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="guidelines-modal-body">
                    <div class="guideline-item">
                        <h4><i class="fas fa-image"></i> Photo Quality</h4>
                        <p>Photos should be high quality (minimum 1920x1080 resolution) and well-lit.</p>
                    </div>
                    <div class="guideline-item">
                        <h4><i class="fas fa-tag"></i> Content</h4>
                        <p>Photos should be related to sailing, club activities, or sailing events.</p>
                    </div>
                    <div class="guideline-item">
                        <h4><i class="fas fa-users"></i> Privacy</h4>
                        <p>Ensure you have permission from people in the photos before submitting.</p>
                    </div>
                    <div class="guideline-item">
                        <h4><i class="fas fa-file-upload"></i> File Format</h4>
                        <p>Accepted formats: JPG, PNG, HEIC. Maximum file size: 10MB per photo.</p>
                    </div>
                    <div class="guideline-item">
                        <h4><i class="fas fa-clock"></i> Review Process</h4>
                        <p>Photos will be reviewed within 48 hours before being added to the gallery.</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(guidelinesModal);

        // Close modal functionality
        const closeBtn = guidelinesModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(guidelinesModal);
        });

        guidelinesModal.addEventListener('click', (e) => {
            if (e.target === guidelinesModal) {
                document.body.removeChild(guidelinesModal);
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add CSS for gallery page
const style = document.createElement('style');
style.textContent = `
    .gallery-filters {
        padding: 10px 0;
        background: var(--light-gray);
    }

    .year-filter-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        max-width: 500px;
        margin: 0 auto;
        flex-wrap: wrap;
    }

    .year-filter-container label {
        font-weight: 600;
        color: var(--primary-maroon);
        margin-bottom: 0;
    }

    .year-filter-container input {
        padding: 12px 16px;
        border: 2px solid var(--light-gray);
        border-radius: 8px;
        font-size: 1rem;
        width: 200px;
        transition: var(--transition);
    }

    .year-filter-container input:focus {
        outline: none;
        border-color: var(--primary-maroon);
        box-shadow: 0 0 0 3px rgba(80, 0, 0, 0.1);
    }

    .year-filter-container input::placeholder {
        color: var(--gray);
    }

    .gallery-section {
        padding: var(--section-padding);
        background: var(--white);
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    .gallery-item {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: var(--transition);
        aspect-ratio: 4/3;
    }

    .gallery-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition);
    }

    .gallery-item:hover img {
        transform: scale(1.1);
    }

    .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(80, 0, 0, 0.9), rgba(128, 0, 0, 0.8));
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1.5rem;
        opacity: 0;
        transition: var(--transition);
        color: var(--white);
    }

    .gallery-item:hover .gallery-overlay {
        opacity: 1;
    }

    .gallery-info h3 {
        color: var(--white);
        margin-bottom: 0.5rem;
    }

    .gallery-info p {
        color: var(--light-gray);
        margin-bottom: 0;
    }

    .gallery-overlay i {
        align-self: flex-end;
        font-size: 1.5rem;
    }

    .upload-section {
        padding: var(--section-padding);
        background: var(--light-gray);
    }

    .upload-content {
        text-align: center;
    }

    .upload-content h2 {
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .upload-content p {
        color: var(--gray);
        font-size: 1.1rem;
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    .upload-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 800px;
        margin: 0 auto;
    }

    .upload-option {
        background: var(--white);
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        transition: var(--transition);
    }

    .upload-option:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .upload-option i {
        font-size: 3rem;
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .upload-option h3 {
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .upload-option p {
        color: var(--gray);
        margin-bottom: 1.5rem;
    }

    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .lightbox-content {
        background: var(--white);
        border-radius: 12px;
        max-width: 90%;
        max-height: 90%;
        overflow: hidden;
        position: relative;
    }

    .lightbox-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid var(--light-gray);
    }

    .lightbox-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--gray);
    }

    .lightbox-image {
        max-height: 70vh;
        overflow: hidden;
    }

    .lightbox-image img {
        width: 100%;
        height: auto;
        max-height: 70vh;
        object-fit: contain;
    }

    .lightbox-description {
        padding: 1.5rem;
        border-top: 1px solid var(--light-gray);
    }

    .lightbox-navigation {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
    }

    .lightbox-nav {
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition);
    }

    .lightbox-nav:hover {
        background: var(--white);
        transform: scale(1.1);
    }

    .upload-modal,
    .guidelines-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .upload-modal-content,
    .guidelines-modal-content {
        background: var(--white);
        border-radius: 12px;
        padding: 2rem;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }

    .upload-modal-header,
    .guidelines-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--light-gray);
        padding-bottom: 1rem;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--gray);
    }

    .upload-form .form-group {
        margin-bottom: 1.5rem;
    }

    .upload-form label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--dark-gray);
    }

    .upload-form input,
    .upload-form select,
    .upload-form textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid var(--light-gray);
        border-radius: 8px;
        font-size: 1rem;
        transition: var(--transition);
    }

    .upload-form input:focus,
    .upload-form select:focus,
    .upload-form textarea:focus {
        outline: none;
        border-color: var(--primary-maroon);
        box-shadow: 0 0 0 3px rgba(80, 0, 0, 0.1);
    }

    .upload-preview {
        margin: 1rem 0;
    }

    .preview-images {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    .preview-item {
        text-align: center;
    }

    .preview-item img {
        width: 100%;
        height: 100px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 0.5rem;
    }

    .preview-name {
        font-size: 0.8rem;
        color: var(--gray);
    }

    .guideline-item {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: var(--light-gray);
        border-radius: 8px;
    }

    .guideline-item h4 {
        color: var(--primary-maroon);
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .guideline-item p {
        color: var(--gray);
        margin-bottom: 0;
    }

    .upload-success-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .upload-success-content {
        background: var(--white);
        border-radius: 12px;
        padding: 2rem;
        text-align: center;
        max-width: 400px;
        width: 90%;
    }

    .success-icon {
        font-size: 4rem;
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
        .year-filter-container {
            flex-direction: column;
            gap: 0.5rem;
        }

        .year-filter-container input {
            width: 100%;
            max-width: 250px;
        }

        .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }

        .upload-options {
            grid-template-columns: 1fr;
        }

        .lightbox-content {
            max-width: 95%;
            max-height: 95%;
        }

        .lightbox-navigation {
            padding: 0 0.5rem;
        }

        .lightbox-nav {
            width: 40px;
            height: 40px;
        }
    }
`;
document.head.appendChild(style);
