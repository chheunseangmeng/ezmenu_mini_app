<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm" @click.self="close">
      <transition name="slide-up">
        <section
          class="glass-card absolute bottom-0 left-0 right-0 mx-auto w-full max-w-md rounded-t-3xl px-5 pb-6 pt-5"
          style="padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));"
        >
          <CartHeader :step="step" :count="count" @back="back" @close="close" />

          <CartList
            v-if="step === 'cart'"
            :items="items"
            :toast-message="toastMessage"
            :format-khr="formatKHR"
            @increment="increment"
            @decrement="decrement"
            @remove="remove"
          />

          <CartPayment
            v-else-if="step === 'payment'"
            :banks="banks"
            :selected-bank="selectedBank"
            :payment-account="paymentAccount"
            @select="setBank"
          />

          <CartReceipt
            v-else
            :items="items"
            :receipt-id="receiptId"
            :transaction-id="transactionId"
            :reference-id="referenceId"
            :receipt-date="receiptDate"
            :selected-bank-name="selectedBankName"
            :total-usd="totalUSD"
            :total-khr-formatted="formatKHR(totalKHR)"
          />

          <div class="mt-5 rounded-2xl bg-ink px-4 py-3 text-white">
            <div class="flex items-center justify-between text-sm">
              <span>Total</span>
              <span class="font-semibold">$ {{ totalUSD.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between text-xs text-white/60">
              <span>KHR</span>
              <span>{{ formatKHR(totalKHR) }}</span>
            </div>
          </div>

          <div class="mt-4">
            <button
              class="w-full rounded-2xl bg-accent py-3 text-sm font-semibold text-white shadow-[0_20px_40px_-25px_rgba(255,92,66,0.9)] disabled:opacity-50 disabled:shadow-none"
              :disabled="primaryDisabled"
              @click="advance"
            >
              {{ primaryLabel }}
            </button>
          </div>
        </section>
      </transition>
    </div>
  </teleport>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useCartStore } from "../../stores/cartStore";
import CartHeader from "./CartHeader.vue";
import CartList from "./CartList.vue";
import CartPayment from "./CartPayment.vue";
import CartReceipt from "./CartReceipt.vue";

const props = defineProps({
  open: { type: Boolean, default: false }
});

const emit = defineEmits(["close", "checkout"]);
const cart = useCartStore();
const items = computed(() => cart.items);
const count = computed(() => cart.count);
const totalUSD = computed(() => cart.total);
const totalKHR = computed(() => cart.totalKHR);
const formatKHR = (value) => new Intl.NumberFormat("en-US").format(Math.round(value));

const close = () => emit("close");
const increment = (id) => cart.increment(id);
const decrement = (id) => cart.decrement(id);

const toastMessage = ref("");
let toastTimer = null;
const remove = ({ id, name }) => {
  cart.removeItem(id);
  toastMessage.value = `Removed ${name}`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastMessage.value = "";
  }, 1400);
};

const step = ref("cart");
const banks = [
  { id: "aba", name: "ABA Bank", detail: "Pay via ABA transfer" },
  { id: "acleda", name: "ACLEDA", detail: "Instant mobile banking" },
  { id: "wing", name: "Wing", detail: "Cash & digital payments" }
];
const selectedBank = ref("aba");
const setBank = (value) => {
  selectedBank.value = value;
};
const paymentAccount = "EZMENU · 003 458 778";
const receiptId = ref("");
const receiptDate = ref("");
const transactionId = ref("");
const referenceId = ref("");
const selectedBankName = computed(() => banks.find((b) => b.id === selectedBank.value)?.name ?? "");

const primaryLabel = computed(() => {
  if (step.value === "cart") return "Checkout";
  if (step.value === "payment") return "Confirm Payment";
  return "Done";
});

const primaryDisabled = computed(() => {
  if (step.value === "cart") return items.value.length === 0;
  if (step.value === "payment") return !selectedBank.value;
  return false;
});

const advance = () => {
  if (step.value === "cart") {
    step.value = "payment";
    return;
  }
  if (step.value === "payment") {
    step.value = "receipt";
    receiptId.value = String(Math.floor(100000 + Math.random() * 900000));
    receiptDate.value = new Date().toLocaleString();
    transactionId.value = `TX-${Math.floor(10000000 + Math.random() * 90000000)}`;
    referenceId.value = `RF-${Math.floor(100000 + Math.random() * 900000)}`;
    return;
  }
  emit("checkout");
};

const back = () => {
  if (step.value === "payment") {
    step.value = "cart";
  } else if (step.value === "receipt") {
    step.value = "payment";
  }
};

watch(
  () => props.open,
  (value) => {
    if (value) {
      step.value = "cart";
    }
  }
);

watch(
  () => props.open,
  (value) => {
    if (!value && toastTimer) {
      clearTimeout(toastTimer);
      toastTimer = null;
      toastMessage.value = "";
    }
  }
);
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 420ms cubic-bezier(0.0, 0.0, 0.2, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}
</style>
