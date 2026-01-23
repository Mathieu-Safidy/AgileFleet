import { Icon } from "lucide-react-native";
import { Component, ComponentType, useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";

type SideBarProps = {
    isOpen?: boolean;
    onClose?: () => void;
    duree?: number;
    menu?: { title: string; icon?: ComponentType<SvgProps>; action: () => void }[];
}

export default function SideBar({ isOpen, onClose, duree, menu }: SideBarProps) {

    const translateX = useRef(new Animated.Value(-300)).current;
    const insets = useSafeAreaInsets();

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isOpen ? 0 : 300,
            duration: duree ?? 300, // ⏱️ durée en ms (ex: 300ms)
            useNativeDriver: true,
        }).start();
    }, [isOpen, duree]);


    return (
        <>
            {/* OVERLAY */}
            {isOpen && (
                <Pressable
                    onPress={onClose}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.4)",
                    }}
                    className="z-50"
                />
            )}

            {/* SIDEBAR */}
            <Animated.View
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 300,
                    height: "100%",
                    backgroundColor: "#fff",
                    padding: 16,
                    transform: [{ translateX }],
                }}
                className="z-50"
            >
                {/* Ajoutez ici les éléments de votre sidebar */}
                {menu?.map((item, index) => (
                    <Pressable key={index} onPress={item.action} style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 12,
                        gap: 12,
                    }}>
                        {item.icon && <item.icon width={20} height={20} />}
                        <Text style={{ fontSize: 16 }}>{item.title}</Text>
                    </Pressable>
                ))}
            </Animated.View>
        </>);
}