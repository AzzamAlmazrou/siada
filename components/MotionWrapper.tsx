'use client'
import { motion } from 'framer-motion'
import React from 'react'

export const FadeInUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
)

export const StaggerParent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={{
            animate: {
                transition: {
                    staggerChildren: 0.1
                }
            }
        }}
        className={className}
    >
        {children}
    </motion.div>
)

export const StaggerChild = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
    <motion.div
        variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={className}
        style={style}
    >
        {children}
    </motion.div>
)
