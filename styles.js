

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 50,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1B3A6B',
  },
  jobCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  jobImage: {
    width: 90,
    minHeight: 100,
  },
  jobInfo: {
    flex: 1,
    padding: 10,
  },
  jobHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobCompany: {
    fontSize: 11,
    color: '#5A6A8A',
    fontWeight: '600',
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  jobMeta: {
    fontSize: 12,
    color: '#5A6A8A',
    marginTop: 2,
  },
  jobDesc: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  jobFooter: {
    fontSize: 11,
    color: '#9AA3B2',
    marginTop: 6,
  },
  heartActive: {
    fontSize: 18,
    color: '#1B3A6B',
  },
  heartInactive: {
    fontSize: 18,
    color: '#CCC',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F3F5FB',
  },
  chipActive: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#1B3A6B',
  },
  chipText: {
    fontSize: 12,
    color: '#5A6A8A',
  },
  chipTextActive: {
    fontSize: 12,
    color: '#fff',
  },
  emptyText: {
    color: '#9AA3B2',
    marginTop: 20,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 15,
    marginTop: 8,
  },
  subheading: {
    fontSize: 14,
    color: '#5A6A8A',
    marginBottom: 10,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listRowText: {
    fontSize: 15,
    color: '#222',
  },
    button: {
    backgroundColor: '#1B3A6B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  breadcrumbBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  breadcrumbBackText: {
    fontSize: 14,
    color: '#1B3A6B',
    fontWeight: '600',
    marginLeft: 2,
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  breadcrumbText: {
    fontSize: 13,
    color: '#1B3A6B',
    fontWeight: '600',
  },
  breadcrumbSep: {
    fontSize: 13,
    color: '#9AA3B2',
  },
  breadcrumbCurrent: {
    fontSize: 13,
    color: '#333',
  },
  detailImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
  },
  detailCompany: {
    fontSize: 13,
    color: '#5A6A8A',
    fontWeight: '600',
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },
});
