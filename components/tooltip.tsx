import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Tooltip só funciona em Web
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <View
      style={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showTooltip && (
        <View style={[styles.tooltip, position === 'bottom' && styles.tooltipBottom]}>
          <Text style={styles.tooltipText}>{text}</Text>
          <View style={[styles.arrow, position === 'bottom' && styles.arrowBottom]} />
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: [{ translateX: '-50%' }],
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 8,
    zIndex: 1000,
    minWidth: 120,
    alignItems: 'center',
  },
  tooltipBottom: {
    bottom: 'auto',
    top: '100%',
    marginBottom: 0,
    marginTop: 8,
  },
  tooltipText: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: [{ translateX: '-50%' }],
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#333',
  },
  arrowBottom: {
    top: 'auto',
    bottom: '100%',
    borderTopWidth: 0,
    borderBottomWidth: 5,
    borderTopColor: 'transparent',
    borderBottomColor: '#333',
  },
});