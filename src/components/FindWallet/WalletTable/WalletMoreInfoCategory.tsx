import dynamic from "next/dynamic"
import { useTranslation } from "next-i18next"
import { MdInfoOutline } from "react-icons/md"
import {
  Box,
  Heading,
  Icon,
  ListIcon,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react"

import { DropdownOption } from "@/lib/types"

import {
  GreenCheckProductGlyphIcon,
  WarningProductGlyphIcon,
} from "@/components/icons/staking"
import Text from "@/components/OldText"

import walletFilterData from "@/data/wallets/wallet-filters"

type WalletMoreInfoCategoryProps = {
  wallet: any
  orderedFeatureDropdownItems: DropdownOption[]
  headingLabel: string
  sectionName: string
}

export const WalletMoreInfoCategory = ({
  wallet,
  orderedFeatureDropdownItems,
  headingLabel,
  sectionName,
}: WalletMoreInfoCategoryProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")

  const Tooltip = dynamic(() => import("@/components/Tooltip"), {
    ssr: false,
  })

  return (
    <Box mx={{ base: 0, md: 0, lg: 2 }} w="100%">
      {/* Category label */}
      <Heading as="h4" lineHeight={1.4} fontSize="md" fontWeight="bold" mb={2}>
        {headingLabel}
      </Heading>

      {/* Supported features */}
      <UnorderedList m={0}>
        {orderedFeatureDropdownItems.map((feature) => {
          const featureColor = wallet[feature.filterKey!] ? "text" : "secondary"
          const FeatureIcon = () => (
            <Icon
              as={
                wallet[feature.filterKey!]
                  ? GreenCheckProductGlyphIcon
                  : WarningProductGlyphIcon
              }
              fontSize="md"
              color={featureColor}
            />
          )

          if (feature.category === sectionName)
            return (
              <ListItem
                key={feature.label}
                fontSize="0.9rem"
                listStyleType="none"
                display="flex"
                mb={2}
                width={{ base: "auto", xl: "full" }}
                sx={{
                  p: {
                    color: featureColor,
                    mb: 0,
                  },
                  "span + p": {
                    textDecor: "none",
                  },
                  "p + div, div + div": {
                    svg: {
                      width: 6,
                      fill: "secondary",
                      pe: 2,
                    },
                  },
                }}
              >
                <ListIcon as={FeatureIcon}></ListIcon>

                <Text px={1} lineHeight={1}>
                  {feature.label}
                </Text>

                <Tooltip
                  content={
                    <Text color="body.base !important">
                      {t(walletFilterData[feature.filterKey].description)}
                    </Text>
                  }
                >
                  <Box as="span">
                    <Icon as={MdInfoOutline} color={featureColor} />
                  </Box>
                </Tooltip>
              </ListItem>
            )
        })}
      </UnorderedList>
    </Box>
  )
}
