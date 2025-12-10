import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';
import { ProductCard } from '../components/ProductCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { useLazyGetProductsQuery, Product } from '../store/services/productsApi';

type FeedScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Feed'
>;

interface FeedScreenProps {
  navigation: FeedScreenNavigationProp;
}

const LIMIT = 10;

export const FeedScreen: React.FC<FeedScreenProps> = ({ navigation }) => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [fetchProducts, { isLoading, isFetching }] = useLazyGetProductsQuery();

  // Initial load
  React.useEffect(() => {
    loadProducts(0, false);
  }, []);

  const loadProducts = async (skipValue: number, append: boolean) => {
    try {
      const result = await fetchProducts({ limit: LIMIT, skip: skipValue }).unwrap();

      if (append) {
        setProducts(prev => [...prev, ...result.products]);
      } else {
        setProducts(result.products);
      }

      setSkip(skipValue + LIMIT);
      setHasMore(skipValue + LIMIT < result.total);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      loadProducts(skip, true);
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProducts(0, false);
    setRefreshing(false);
  }, []);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Login');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        {user?.image && (
          <Image source={{ uri: user.image }} style={styles.avatar} />
        )}
        <View style={styles.userText}>
          <Text style={styles.userName}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} onPress={() => handleProductPress(item)} />
  );

  const renderFooter = () => {
    if (isLoading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={COLORS.primary} />
        <Text style={styles.footerText}>Loading more products...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.emptyText}>Loading products...</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
  },
  listContent: {
    padding: 16,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userText: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.error,
    borderRadius: 6,
  },
  logoutText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});
