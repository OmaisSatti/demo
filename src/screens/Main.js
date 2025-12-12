import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
    title: 'Rare Nintendo DS Lite Mario Special Edition NFR',
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
    currentBid: '$75',
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
    if (index === 0) {
      return (
        <TouchableOpacity style={styles.bigCard}>
          <ImageBackground
            source={item.bg}
            style={styles.bigCardImage}
            imageStyle={{ borderRadius: 22 }}
          >
            <View style={styles.badgeRow}>
              <View style={styles.crownDot}>
                <Text style={{ fontSize: 16 }}>👑</Text>
              </View>
              <View style={styles.bidPill}>
                <Text style={styles.bidLabel}>CURRENT BID</Text>
                <Text style={styles.bidValue}>{item.currentBid}</Text>
              </View>
              <View style={styles.timePill}>
                <Text style={styles.timeValue}>14</Text>
                <Text style={styles.timeLabel}>HOURS</Text>
              </View>
              <View style={styles.timePill}>
                <Text style={styles.timeValue}>35</Text>
                <Text style={styles.timeLabel}>MINS</Text>
              </View>
              <View style={styles.timePill}>
                <Text style={styles.timeValue}>23</Text>
                <Text style={styles.timeLabel}>SEC</Text>
              </View>
            </View>

            <View style={styles.bigCardFooter}>
              <Text style={styles.location}>📍 {item.location}</Text>
              <Text numberOfLines={1} style={styles.bigCardTitle}>
                {item.title}
              </Text>
              <Text numberOfLines={2} style={styles.bigCardSubtitle}>
                Rare Nintendo DS Lite Mario Special Edition NFR Download Station
                demo console...
              </Text>
            </View>

            <View style={styles.bigFav}>
              <Text style={styles.bigFavIcon}>♡</Text>
              <Text style={styles.bigFavCount}>13</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.smallCard}>
        <Image
          source={item.thumb}
          style={styles.smallThumb}
          resizeMode="cover"
        />
        <View style={styles.smallBody}>
          <View style={styles.smallTagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Graded Games</Text>
            </View>
          </View>
          <Text style={styles.smallTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.smallSubtitle} numberOfLines={2}>
            Sealed Yu Gi Oh 5D's World Championship 2011...
          </Text>
          <View style={styles.smallMetaRow}>
            <Text style={styles.meta}>📍 {item.location}</Text>
            <View style={styles.metaRight}>
              <View style={styles.metaPill}>
                <Text style={styles.metaIcon}>♥</Text>
                <Text style={styles.metaValue}>13</Text>
              </View>
              <View style={[styles.metaPill, { marginLeft: 8 }]}>
                <Text style={styles.metaIcon}>👁</Text>
                <Text style={styles.metaValue}>27</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.favButton}>
          <Text style={styles.favIcon}>♡</Text>
        </TouchableOpacity>
        <View style={styles.smallPriceBadge}>
          <Text style={styles.smallPriceText}>04H 44M</Text>
          <Text style={styles.smallMinBid}>MIN. BID {item.currentBid}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* top breadcrumb like in design */}
        <Text style={styles.screenLabel}>Home</Text>

        {/* header row */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>≡</Text>
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
              <Text style={styles.iconText}>🔔</Text>
              <View style={styles.redDot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* hero banner */}
        <ImageBackground
          source={IMG_HOME_BG}
          style={styles.banner}
          imageStyle={{ borderRadius: 18 }}
        >
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>Find Your Dream Collectible</Text>
            <Text style={styles.bannerSubtitle}>
              You've arrived at the coolest collectibles auction site!
            </Text>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.viewBtnText}>View Auction</Text>
            </TouchableOpacity>
          </View>

          {/* category pill over the banner (like the screenshot) */}
          <TouchableOpacity
            style={styles.categoryPill}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={styles.categoryPillText}>{activeCategory}</Text>
            <Text style={styles.categoryArrow}>⌄</Text>
          </TouchableOpacity>
        </ImageBackground>

        {/* auctions header + filters */}
        <Text style={styles.h1}>Auctions</Text>

        <View style={styles.chipsRow}>{FILTER_CHIPS.map(renderChip)}</View>

        {/* list */}
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

      {/* category dropdown */}
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
                      <Text style={styles.modalCheck}>✓</Text>
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
  safe: { flex: 1, backgroundColor: '#F4F4F7' },
  container: { paddingHorizontal: 18, paddingTop: 4 },

  screenLabel: {
    fontSize: 14,
    color: '#C2C2C8',
    marginBottom: 8,
  },

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
  iconText: { fontSize: 20 },
  bellWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#F3B21B',
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
    backgroundColor: '#F3B21B',
  },
  toggleText: {
    fontSize: 16,
    color: '#75706A',
    fontWeight: '700',
  },
  toggleTextActive: { color: '#111' },

  banner: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 18,
    justifyContent: 'space-between',
  },
  bannerLeft: {
    width: '70%',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 12,
    opacity: 0.95,
  },
  viewBtn: {
    backgroundColor: '#F3B21B',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  viewBtnText: { color: '#111', fontWeight: '800', fontSize: 15 },

  // category pill over hero
  categoryPill: {
    position: 'absolute',
    right: 16,
    bottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryPillText: {
    fontSize: 14,
    color: '#3E372D',
    fontWeight: '600',
  },
  categoryArrow: {
    marginLeft: 6,
    fontSize: 11,
    color: '#8C847A',
  },

  h1: {
    fontSize: 24,
    fontWeight: '800',
    color: '#121212',
    marginBottom: 10,
  },

  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 18,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: '#FBC646',
    borderColor: '#FBC646',
  },
  chipInactive: {
    backgroundColor: '#F6EFE3',
    borderColor: '#E3D7C6',
  },
  chipText: {
    fontSize: 13.5,
    color: '#7A7166',
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#1A1A1A',
  },

  listWrap: {
    marginTop: 6,
  },

  bigCard: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  bigCardImage: {
    width: '100%',
    height: 260,
    justifyContent: 'flex-end',
    padding: 16,
  },
  badgeRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  crownDot: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F3B21B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  bidPill: {
    backgroundColor: '#F3B21B',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 130,
    justifyContent: 'center',
    marginRight: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  bidLabel: { fontSize: 13, color: '#222', fontWeight: '800' },
  bidValue: { fontSize: 24, fontWeight: '900', color: '#111' },
  timePill: {
    backgroundColor: '#F3B21B',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  timeValue: { fontSize: 16, fontWeight: '900', color: '#111' },
  timeLabel: { fontSize: 11, fontWeight: '700', color: '#6A5B3E' },
  bigCardFooter: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 16,
    borderRadius: 18,
    width: '92%',
    alignSelf: 'center',
    marginTop: 16,
  },
  location: {
    color: '#fff',
    marginBottom: 10,
    fontWeight: '800',
    fontSize: 18,
  },
  bigCardTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 6,
  },
  bigCardSubtitle: { color: '#fff', opacity: 0.95, marginTop: 2, fontSize: 16 },
  bigFav: {
    position: 'absolute',
    top: 18,
    right: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  bigFavIcon: { fontSize: 16, color: '#C66' },
  bigFavCount: { marginLeft: 6, fontWeight: '800', color: '#111' },

  smallCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 12,
    paddingRight: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8E0D2',
  },
  smallThumb: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
  },
  smallBody: { flex: 1, paddingRight: 26 },
  smallTagRow: { marginBottom: 6 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F7E2B5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  tagText: { fontSize: 13, fontWeight: '800', color: '#1B1B1B' },
  smallTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
    color: '#121212',
  },
  smallSubtitle: { color: '#7A6F63', marginBottom: 10, fontSize: 14 },
  smallMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: { color: '#FF8A00', fontWeight: '700' },
  metaRight: { flexDirection: 'row', alignItems: 'center' },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1ECE3',
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  metaIcon: { marginRight: 3, fontSize: 12 },
  metaValue: { color: '#333', fontWeight: '800' },
  smallPriceBadge: {
    position: 'absolute',
    left: 14,
    bottom: 12,
    backgroundColor: '#FBC646',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  smallPriceText: { fontWeight: '900', fontSize: 15, color: '#111' },
  smallMinBid: { fontSize: 11, fontWeight: '700', color: '#3A2E1A' },
  favButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF9F0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#E7DCCB',
  },
  favIcon: { fontSize: 18, color: '#2B2B2B' },

  // dropdown
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 170, // roughly under the category pill
    paddingRight: 22,
  },
  dropdownWrapper: {
    alignItems: 'flex-end',
  },
  modalPointer: {
    width: 14,
    height: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
    marginRight: 32,
    marginBottom: -7,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  modal: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 18,
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
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalText: {
    fontSize: 15,
    color: '#292828',
  },
  modalTextActive: {
    fontWeight: '800',
  },
  modalCheck: { fontSize: 16, color: '#F3B21B', fontWeight: '700' },
});
