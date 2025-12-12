import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';

const IMG_G1 = require('../assets/images/g1.png');
const IMG_G2 = require('../assets/images/g2.png');
const IMG_AUCTION_BG = require('../assets/images/auctionbg.png');
const IMG_HOME_BG = require('../assets/images/homebg.png');

const CATEGORIES = [
  'Accessories',
  'Arcades',
  'Collectible',
  'Toys',
  'Comics',
  'Consoles',
  'Employee',
  'Promos',
  'Games Graded',
  'Games Kiosks',
];

const FILTER_CHIPS = [
  'Featured',
  'New Listing',
  'Coming Soon',
  'Sold',
  'Closed',
];

const AUCTIONS = [
  {
    id: 'a1',
    title: "Find Your Dream Collectible, You've arrived...",
    location: 'Huston TX',
    currentBid: '$130',
    bg: IMG_AUCTION_BG,
  },
  {
    id: 'a2',
    title: "2011 Yu-Gi-Oh! 5D's World Championship 2011 DS...",
    location: 'Huston TX',
    currentBid: '$50',
    thumb: IMG_G1,
  },
  {
    id: 'a3',
    title: "2011 Yu-Gi-Oh! 5D's World Championship 2011 DS...",
    location: 'Huston TX',
    currentBid: '$50',
    thumb: IMG_G2,
  },
];

const Main = () => {
  const [mode, setMode] = useState('Buy');
  const [activeCategory, setActiveCategory] = useState('Arcades');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Featured');

  const renderChip = chip => (
    <TouchableOpacity
      key={chip}
      style={[
        styles.chip,
        activeFilter === chip ? styles.chipActive : styles.chipInactive,
      ]}
      onPress={() => setActiveFilter(chip)}
    >
      <Text
        style={[
          styles.chipText,
          activeFilter === chip && styles.chipTextActive,
        ]}
      >
        {chip}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    // ===== BIG TOP CARD =====
    if (index === 0) {
      return (
        <TouchableOpacity style={styles.bigCard}>
          <ImageBackground
            source={item.bg}
            style={styles.bigCardImage}
            imageStyle={{ borderRadius: 18 }}
          >
            {/* bottom gradient overlay */}
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 0.8 }}
              style={styles.bottomGradient}
            />

            {/* top crown + bid pill */}
            <View style={styles.badgeRow}>
              <View style={styles.crownDot}>
                <Icon name="crown" size={18} color="#FFF" />
              </View>

              <LinearGradient
                colors={['#FFD96A', '#F6B13A']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.bidMainPill}
              >
                {/* left: CURRENT BID + amount */}
                <View style={styles.bidLeft}>
                  <Text style={styles.bidLabel}>CURRENT BID</Text>
                  <Text style={styles.bidValue}>{item.currentBid}</Text>
                </View>

                {/* right: timer pills */}
                <View style={styles.timerRow}>
                  <View style={styles.timePill}>
                    <Text style={styles.timeValue}>14</Text>
                    <Text style={styles.timeLabel}>HOURS</Text>
                  </View>
                  <View style={styles.timePill}>
                    <Text style={styles.timeValue}>35</Text>
                    <Text style={styles.timeLabel}>MINS</Text>
                  </View>
                  <View style={{ ...styles.timePill, marginRight: 15 }}>
                    <Text style={styles.timeValue}>23</Text>
                    <Text style={styles.timeLabel}>SEC</Text>
                  </View>
                </View>
              </LinearGradient>
              <View style={styles.bigFav}>
                <Icon name="heart" size={14} color="#FF6A80" style={{ marginRight: 4 }} />
                <Text style={styles.bigFavCount}>13</Text>
              </View>
            </View>

            {/* bottom info (sits on top of gradient) */}
            <View style={styles.bigCardFooter}>
              <View style={styles.bigLocationRow}>
                <View style={styles.locationDot} />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>

              <Text numberOfLines={1} style={styles.bigCardTitle}>
                {item.title}
              </Text>
              <Text numberOfLines={2} style={styles.bigCardSubtitle}>
                Rare Nintendo DS Lite Mario Special Edition NFR Download Station
                demo console...
              </Text>
            </View>

            {/* like pill on top-right */}
          </ImageBackground>
        </TouchableOpacity>
      );
    }

    // ===== SMALL LIST CARDS =====
    return (
      <View style={styles.smallCard}>
        {/* left thumbnail */}
        <View style={styles.smallThumbWrap}>
          <Image
            source={item.thumb}
            style={styles.smallThumb}
            resizeMode="cover"
          />

          {/* yellow time / bid pill (one line) */}
          <View style={styles.smallPriceBadge}>
            <Text style={styles.smallPriceText}>
              04H 44M / MIN. BID {item.currentBid}
            </Text>
          </View>
        </View>

        {/* right body */}
        <View style={styles.smallBody}>
          <View style={styles.smallHeaderRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Graded Games</Text>
            </View>

            {/* outline heart circle in top-right */}
            <TouchableOpacity style={styles.smallFavButton}>
              <Icon name="heart" size={14} color="#FF6A80" />
            </TouchableOpacity>
          </View>

          <Text style={styles.smallTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.smallSubtitle} numberOfLines={2}>
            Sealed Yu Gi Oh 5D's World Championship 2011...
          </Text>

          <View style={styles.smallMetaRow}>
            <View style={styles.metaLeft}>
              <View style={styles.locationDot} />
              <Text style={styles.metaLocationText}>{item.location}</Text>
            </View>

            <View style={styles.metaRight}>
              <View style={styles.metaPill}>
                <Icon name="heart" size={12} color="#555" style={{ marginRight: 4 }} />
                <Text style={styles.metaValue}>13</Text>
              </View>
              <View style={[styles.metaPill, { marginLeft: 12 }]}>
                <Icon name="eye" size={12} color="#555" style={{ marginRight: 4 }} />
                <Text style={styles.metaValue}>27</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER (menu, buy/sell, bell) */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bars" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.toggleWrap}>
            <TouchableOpacity
              onPress={() => setMode('Buy')}
              style={[styles.toggle, mode === 'Buy' && styles.toggleActive]}
            >
              <Text
                style={[
                  styles.toggleText,
                  mode === 'Buy' && styles.toggleTextActive,
                ]}
              >
                Buy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMode('Sell')}
              style={[styles.toggle, mode === 'Sell' && styles.toggleActive]}
            >
              <Text
                style={[
                  styles.toggleText,
                  mode === 'Sell' && styles.toggleTextActive,
                ]}
              >
                Sell
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.bellWrap}>
              {/* <Text style={styles.iconText}>🔔</Text> */}
              <Icon name="bell" size={20} backgroundColor="#3b5998" />
              <View style={styles.redDot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* HERO BANNER */}
        <ImageBackground
          source={IMG_HOME_BG}
          style={styles.banner}
          imageStyle={{ borderRadius: 24 }}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Find Your Dream Collectible</Text>
            <Text style={styles.bannerSubtitle}>
              You've arrived at the coolest collectibles auction site!
            </Text>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.viewBtnText}>View Auction</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* AUCTIONS HEADER + CATEGORY */}
        <View style={styles.auctionHeaderRow}>
          <Text style={styles.h1}>Auctions</Text>

          <TouchableOpacity
            style={styles.categoryHeaderBtn}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={styles.categoryHeaderText}>Category</Text>
            <Icon name="down" size={10} color="#7B746A" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        {/* HORIZONTAL FILTER TABS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsRow}
        >
          {FILTER_CHIPS.map(renderChip)}
        </ScrollView>

        {/* LIST */}
        <View style={styles.listWrap}>
          <FlatList
            data={AUCTIONS}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
          />
        </View>
      </ScrollView>
</ImageBackground>
      {/* CATEGORY DROPDOWN */}
      <Modal visible={showCategoryModal} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowCategoryModal(false)}
        >
          <View style={styles.dropdownWrapper}>
            <View style={styles.modalPointer} />
            <View style={styles.modal}>
              {CATEGORIES.map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.modalItem,
                    category === activeCategory && styles.modalItemActive,
                  ]}
                  onPress={() => {
                    setActiveCategory(category);
                    setShowCategoryModal(false);
                  }}
                >
                  <View style={styles.modalRow}>
                    <Text
                      style={[
                        styles.modalText,
                        category === activeCategory && styles.modalTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                    {category === activeCategory && (
                      <Icon name="check" size={13} color="#000" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F3F6', paddingTop: 30 },
  container: { paddingHorizontal: 18, paddingTop: 4 },

  screenLabel: {
    fontSize: 14,
    color: '#C1C1C7',
    marginBottom: 8,
  },

  /* HEADER */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0E9DD',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconText: { fontSize: 25 },
  bellWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#F8B42E',
    position: 'absolute',
    right: -1,
    top: -1,
  },

  toggleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 4,
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    minWidth: 170,
  },
  toggle: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 24,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#F8B42E',
  },
  toggleText: {
    fontSize: 13,
    color: '#75706A',
    fontWeight: '500',
  },
  toggleTextActive: { color: '#111' },

  /* BANNER */
  banner: {
    width: '100%',
    resizeMode: 'cover',
    marginBottom: 18,
    borderRadius: 24,
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 14,
    maxWidth: '70%',
    marginBottom: 12,
    opacity: 0.95,
  },
  viewBtn: {
    backgroundColor: '#F8B42E',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  viewBtnText: { color: '#111', fontWeight: '400', fontSize: 12 },

  /* AUCTIONS HEADER */
  auctionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 5,
  },
  h1: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  categoryHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryHeaderText: {
    fontSize: 14,
    color: '#7B746A',
    fontWeight: '400',
  },
  categoryHeaderArrow: {
    fontSize: 11,
    color: '#7B746A',
    marginLeft: 4,
  },

  /* FILTER CHIPS */
  chipsScroll: {
    marginBottom: 14,
  },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: '#F8B42E',
    borderColor: '#F8B42E',
  },
  chipInactive: {
    backgroundColor: '#F7EDDC',
    borderColor: '#F7EDDC',
  },
  chipText: {
    fontSize: 11,
    color: '#7A7166',
    fontWeight: '400',
  },
  chipTextActive: {
    color: '#1A1A1A',
  },

  listWrap: {
    marginTop: 6,
  },

  /* BIG CARD */
  bigCard: {
    borderRadius: 24,
    overflow: 'hidden',
    // marginBottom: 10,
  },
  bigCardImage: {
    width: '100%',
    height: 230,
  },

  // full bottom gradient
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%', // how tall the fade is – tweak if needed
    borderRadius: 24,
  },

  // top badge row
  badgeRow: {
    marginHorizontal: 10,
    // position: 'absolute',
    top: 12,
    // left: 16,
    // right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  crownDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8B42E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  crownIcon: {
    fontSize: 18,
  },

  bidMainPill: {
    flex: 1,
    marginHorizontal:10,
    borderRadius: 8,
    paddingVertical: 6,
    paddingLeft: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bidLeft: {
    flexDirection: 'column',
    // marginRight: 2,
    marginLeft:8,
    // marginBottom: 5,
  },
  bidLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#6b4a00',
    letterSpacing: 0.5,
  },
  bidValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2b1a00',
  },

  timerRow: {
    flexDirection: 'row',
    // marginBottom: 11,
    alignItems: 'center',
  },
  timePill: {
    minWidth: 40,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  timeValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2b1a00',
  },
  timeLabel: {
    fontSize: 8,
    fontWeight: '500',
    color: '#2b1a00',
    marginTop: 1,
  },

  bigCardFooter: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
  bigLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F8B42E',
    // marginRight: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  bigCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  bigCardSubtitle: {
    fontSize: 12,
    color: '#f5f5f5',
  },

  // like pill on top-right
  bigFav: {

    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(236, 236, 236, 0.95)',
    borderWidth: 1,
    borderColor: '#ffffffff',
  },
  bigFavIcon: {
    fontSize: 14,
    marginRight: 4,
    color: '#FF6A80',
  },
  bigFavCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1c1c1cff',
  },

  /* SMALL CARDS */
  smallCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 8,
    // marginBottom:10,
    paddingRight: 10,
    alignItems: 'center',
    shadowColor: '#00000080',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },

  smallThumbWrap: {
    position: 'relative',
    marginRight: 12,
  },
  smallThumb: {
    width: 140,
    height: 130,
    borderRadius: 16,
  },

  smallPriceBadge: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    backgroundColor: '#F8B42E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  smallPriceText: {
    fontWeight: '500',
    fontSize: 8,
    color: '#111',
  },

  smallBody: {
    flex: 1,
    // paddingRight: 4,
  },
  smallHeaderRow: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#fbe9c7ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  tagText: { fontSize: 10, fontWeight: '400', color: '#C08619' },

  smallFavButton: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e3e3e3ff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1ff',
  },
  smallFavIcon: {
    fontSize: 14,
    color: '#FF6A80',
  },

  smallTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#121212',
  },
  smallSubtitle: { color: '#B4A9A0', marginBottom: 8, fontSize: 11 },

  smallMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaLocationText: {
    fontSize: 11,
    color: '#8F8680',
  },

  metaRight: { flexDirection: 'row', alignItems: 'center' },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: { marginRight: 4, fontSize: 12, color: '#555' },
  metaValue: { color: '#555', fontWeight: '500', fontSize: 11 },

  favButton: {
    // reserved if needed later
  },

  /* DROPDOWN */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdownWrapper: {
    position: 'absolute',
    top: 260, // roughly under "Category" header
    right: 22,
    alignItems: 'flex-end',
  },
  modalPointer: {
    width: 14,
    height: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
    marginRight: 18,
    marginBottom: -7,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  modal: {
    width: 130,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  modalItemActive: {
    backgroundColor: '#FFF6DE',
    borderRadius: 20,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalText: {
    fontSize: 12,
    color: '#292828',
  },
  modalTextActive: {
    fontWeight: '500',
  },
  modalCheck: { fontSize: 13, color: '#000000ff', fontWeight: '700' },
});
