use std::os::unix::thread;

use crate::constant::{ALPHABET, PROTOCOL_KEY};
use rand::{prelude::*, thread_rng};

pub fn format_storage(bytes: u64) -> String {
    const TB: u64 = 1_099_511_627_776;
    const GB: u64 = 1_073_741_824;
    const MB: u64 = 1_048_576;

    if bytes >= TB {
        format!("{:.1} TB", bytes as f64 / TB as f64)
    } else if bytes >= GB {
        format!("{:.1} GB", bytes as f64 / GB as f64)
    } else {
        format!("{:.1} MB", bytes as f64 / MB as f64)
    }
}

pub fn format_duration_secs(secs: u64) -> String {
    if secs >= 3600 {
        format!("{:.1} hours", secs as f64 / 3600.0)
    } else if secs >= 60 {
        format!("{:.1} minutes", secs as f64 / 60.0)
    } else {
        format!("{} seconds", secs)
    }
}

pub enum PoolCheck {
    Valid(u64),
    Invalid(String),
}

pub fn check_pool_size(pool_size: u64) -> PoolCheck {
    if pool_size == 0 {
        PoolCheck::Invalid("Invalid pool size".to_string())
    } else {
        PoolCheck::Valid(pool_size)
    }
}

// pub fn generate_pool_invite_code() -> String {
//     let keyword = PROTOCOL_KEY;
//     let mut rng = thread_rng();

//     let mut random_int = rng.gen_range(1000..=9999);
// }
